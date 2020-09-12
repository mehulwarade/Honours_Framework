##############################################################################################################
#                                       Author - Mehul Warade                                                #
# This program requires image file to be downloaded from https://www.spacetelescope.org/images/heic1502a/    #
#                                                                                                            #
##############################################################################################################


import numpy as np
import cv2
from mpi4py import MPI
import os
thisdirname = os.path.dirname(os.path.abspath(__file__))

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

a = np.empty(([0]),dtype='uint8')
row = None
clm = None

if rank == 0:
        t1 = MPI.Wtime()
        a = np.loadtxt(os.path.join(thisdirname,'heic1502a_15mb.array'), dtype='uint8')
        t2 = MPI.Wtime()
        print (" Time taken to open and read the image is : %r sec " %(t2-t1))

        row = a.shape[0]
        clm = a.shape[1]

        test_chunks = np.array_split(a,size,axis=0)
else:
        test_chunks = None

row = comm.bcast(row, root=0)
clm = comm.bcast(clm, root=0)

w1 = MPI.Wtime()
total = np.array([0])
test_chunk = comm.scatter(test_chunks,root=0)

#image processing
img_node_thresh =  cv2.adaptiveThreshold(test_chunk,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,59,0)

star_count_node = ((200 < img_node_thresh)).sum()
# print (" Star count at Rank", rank,"is ", star_count_node)

comm.Reduce(star_count_node,total,op=MPI.SUM,root=0) # Reduce to zero process

if comm.rank == 0:
        w2 = MPI.Wtime()
        # print (" Total Stars ", total)
        print (" Total time taken", w2-w1 ,"sec")