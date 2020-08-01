#!/usr/bin/env python

from mpi4py import MPI
import sys
import numpy as np
from time import time

size = int( sys.argv[1])
TaskMaster = 0

#print ("Initialising variables.\n")
a = np.loadtxt('array1/%s.array' %size)
b = np.loadtxt('array2/%s.array' %size)

c = np.zeros(shape=(size, size))


comm = MPI.COMM_WORLD
worldSize = comm.Get_size()
rank = comm.Get_rank()
processorName = MPI.Get_processor_name()

#print ("Process %d started.\n" % (rank))
#print ("Running from processor %s, rank %d out of %d processors.\n" % (processorName, rank, worldSize))

#Calculate the slice per worker
if (worldSize == 1):
    slice = size
else:
    slice = int(size / (worldSize-1)) #make sure it is divisible

assert slice >= 1
comm.Barrier()

t = time()

if rank == TaskMaster:
    #print ("Initialising Matrix A and B (%d,%d).\n" % (size, size))
    # print ("Start")
        
    for i in range(1, worldSize):
        offset = (i-1)*slice #0, 10, 20
        row = a[offset,:]
        comm.send(offset, dest=i, tag=i)
        comm.send(row, dest=i, tag=i)
        for j in range(0, slice):
            comm.send(a[j+offset,:], dest=i, tag=j+offset)
    # print ("All sent to workers.\n")

comm.Barrier()

if rank != TaskMaster:

    #print ("Data Received from process %d.\n" % (rank))
    offset = comm.recv(source=0, tag=rank)
    recv_data = comm.recv(source=0, tag=rank)
    for j in range(1, slice):
        c = comm.recv(source=0, tag=j+offset)
        recv_data = np.vstack((recv_data, c))

    # print ("Start Calculation from process %d.\n" % (rank))

    #Loop through rows
    t_start = MPI.Wtime()
    for i in range(0, slice):
        res = np.zeros(shape=(size))
        if (slice == 1):
            r = recv_data
        else:
            r = recv_data[i,:]
        ai = 0
        for j in range(0, size):
            q = b[:,j] #get the column we want
            for x in range(0, size):
                res[j] = res[j] + (r[x]*q[x])
            ai = ai + 1
        if (i > 0):
           send = np.vstack((send, res))
        else:
            send = res
    t_diff = MPI.Wtime() - t_start

    # print("Process %d finished in %5.4fs.\n" %(rank, t_diff))
    #Send large data
    #print ("Sending results to Master %d bytes.\n" % (send.nbytes))
    comm.Send([send, MPI.FLOAT], dest=0, tag=rank) #1, 12, 23

# comm.Barrier()

if rank == TaskMaster:  
    #print ("Checking response from Workers.\n")
    res1 = np.zeros(shape=(slice, size))
    comm.Recv([res1, MPI.FLOAT], source=1, tag=1)
    #print ("Received response from 1.\n")
    kl = np.vstack((res1))
    for i in range(2, worldSize):
        resx= np.zeros(shape=(slice, size))
        comm.Recv([resx, MPI.FLOAT], source=i, tag=i)
        #print ("Received response from %d.\n" % (i))
        kl = np.vstack((kl, resx))
    # print ("End")
    #print ("Result AxB.\n")
    # print (kl)  #mpirun --hostfile machinefile -np 3 python3 matrixmultiplication.py 120 ##### check result
    
    delta = time() - t
    print(delta) 

    del a, b, c






