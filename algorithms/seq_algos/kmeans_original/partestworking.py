# https://github.com/asarbaev/Parallel-implementation-of-k-means-
import math
import csv
import time
import sys
import numpy as np
import collections
from mpi4py import MPI

comm = MPI.COMM_WORLD
size = comm.Get_size()
rank = comm.Get_rank()


global dimensions, num_clusters, num_points,dimensions,data,flag

f  = open('3D_spatial_network.csv', "rt", encoding="utf8")
reader = csv.reader(f)
data = list(reader)
	
data.pop(0)
for i in range (len(data)):
	data[i].pop(0)
data=data[0:1000]
data=np.array(data).astype(np.float)

#===================================================Devide data set to further scattering=====================
def chunkIt(seq, num):
    avg = len(seq) / float(num)
    out = []
    last = 0.0

    while last < len(seq):
        out.append(seq[int(last):int(last + avg)])
        last += avg
    return out
#===================================================Count lables for recalculating means of centroids=====================	
def addCounter(counter1, counter2, datatype):
    for item in counter2:
        counter1[item] += counter2[item]
    return counter1

num_clusters=0

print('X')
if rank==0:
	print('A')
	num_clusters = int(sys.argv[1])
	start_time = time.time() 										#turn on a timer which allows us to estimate performane of this algorithm
	initial=[]
	for i in range(num_clusters):
		initial.append(data[i])
	initial=np.vstack(initial)
	print(initial)
	print('B')
	#====================================================================================================

	num_points = len(data)                                    #number of rows
	dimensions = len(data[0])                                 #number of columns
	#chunks = [ [] for _ in range(size) ]

	#for i, chunk in enumerate(data):
	#	chunks[i % size].append(chunk)
	chunks=chunkIt(data,size)								  #deviding data set on parts for further scattering
	print('C')
	# comm.Barrier()
 #====================================================================================================
else:														  #workers part
	print('D')
	chunks = None											  #initilize variable
	initial = None											  #initilize variable
	data = None											      #initilize variable
	dimensions = None										  #initilize variable
	num_points = None										  #initilize variable
	cluster= None											  #initilize variable
	Q_clust= None											  #initilize variable
	num_clusters= None										  #initilize variable
	centroid=None
	# kmeans= None
	start_time=None
	#====================================================================================================
start_time=comm.bcast(start_time,root=0)
data=comm.scatter(chunks, root=0)							  #send chunks of data set to the workers
num_clusters=comm.bcast(num_clusters,root=0)
initial=comm.bcast(initial, root = 0)						  #send centroid matrix to the workers
flag= True
while flag==True:
	print('E')
	clusters=[]											  		  #initilize variable
	cluster=[]
	#print str(rank) + ': ' + str(data)
	#===================================Calculating dist matrix in each process==============================
	dist =np.zeros((len(data),len(initial)))


	for j in range(len(initial)):
		for i in range(len(data)):
			dist[i][j]=np.linalg.norm(initial[j]-data[i])
	# print('rank',rank,dist)		
	#===================================Initilize lable for each sample in each process======================
	for i in range (len(dist)):										#iterable take each raw in dist matrix and 
		clusters.append(np.argmin(dist[i])+1)                       #find column index of min value (this index is number of centorud)
	# print(clusters)
	#===================================Calculating the number of samples in each cluster====================
	Q_clusts=collections.Counter(clusters)							
	#Q_clusts=np.array((collections.Counter(clusters).keys(),collections.Counter(clusters).values()))# what is the labels was faced in each process and their frequency 
	#===================================Summing the number of samples for each cluster=======================
	# print(addCounter)
	counterSumOp = MPI.Op.Create(addCounter, commute=True)
	# print(counterSumOp)
	totcounter = comm.allreduce(Q_clusts, op=counterSumOp)
	# print(totcounter)
	comm.Barrier()
	#print ('Q',Q_clusts)
	#print('T',totcounter)
	#=========================================================================================================
	#====================================From each worker we gather cluster vector and join them ============
	cluster=comm.gather(clusters, root=0)
	print(cluster)
	print('zzzzzzzzzzzzzzzzzzzzzzz')
	#data=comm.gather(data,root=0)
	comm.Barrier()
	#print('cl1',cluster)
	#==========================================================================================================
	if rank==0:
		print('ahahahahahahahhahahahahahahahahahaha')
		cluster=[item for sublist in cluster for item in sublist]
	#	data = [item.tolist() for item in data]
	#	data=[item for sublist in data for item in sublist]
	#	print(data)
	#	print(cluster)

	centroids=np.zeros((len(initial),len(initial[0])))
	for k in range (1,num_clusters+1):
		indices = [i for i, j in enumerate(clusters) if j == k]
		#print('ind',indices)        
		#print(k,  [data[i] for i in indices] )
		#print('sum',np.sum([data[i] for i in indices], axis=0 ))
		#print('div',np.divide((np.sum([data[i] for i in indices], axis=0)).astype(np.float),totcounter[k]))
		centroids[k-1]=np.divide((np.sum([data[i] for i in indices], axis=0)).astype(np.float),totcounter[k])

	centroid=comm.allreduce(centroids,MPI.SUM)
	comm.Barrier()
	#print('centroids',centroids)
	#print ('initial', initial)
	#print('centroid',centroid)
		
	print('aaaaaaaaaaaaaaaaaaaaaaaaaa')
	if np.all(centroid==initial):
		flag=False
		print ("Execution time %s seconds" % (time.time() - start_time))
		
	else:
	#	print ('initial after', initial)
		print('xxxxxxxxxxxxxxxxxx')
		initial= centroid 
	comm.Barrier()
	
