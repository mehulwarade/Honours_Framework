#https://stackoverflow.com/a/49970737


from __future__ import division, print_function
from mpi4py import MPI
import numpy as np

comm = MPI.COMM_WORLD
nproc = comm.Get_size()
rank = comm.Get_rank()


scal = None

if rank==0:
    scal = 55.0

scal = comm.bcast(scal, root=0)


print("Rank: ", rank, ". Scalar is:\n", scal)