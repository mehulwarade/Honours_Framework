##############################################################################################################
#                                       Author - Mehul Warade                                                #
# This program requires image file to be downloaded from https://www.spacetelescope.org/images/heic1502a/    #
#                                                                                                            #
#       Original github repo: https://github.com/swanandM/Galaxy-Star-Count-Mpi4py                           #
##############################################################################################################


import numpy as np
import cv2
from mpi4py import MPI

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()

a = np.empty(([0]),dtype='uint8')
row = None
clm = None

if rank == 0:
        # t1 = MPI.Wtime()
        img = cv2.imread("heic1502a_120mb.tif",0) #Read the image
        # t2 = MPI.Wtime()
        # print (" Time taken to open and read the image is : %r sec " %(t2-t1))
        a = np.array(img)  #Convert to a Matrix
        row = a.shape[0]
        clm = a.shape[1]

row = comm.bcast(row, root=0)
clm = comm.bcast(clm, root=0)

comm.Barrier()
w1 = MPI.Wtime()
remender = row % size  # devide image horizontally

if rank < remender:
        rowsize = row/size
        rowsize = rowsize + 1
else:
        rowsize = row/size

local_x = np.zeros((row,clm),dtype='uint8')
total = np.array([0])

comm.Scatterv(a,local_x,root=0) # scatter the image

#image processing
img_node_thresh =  cv2.adaptiveThreshold(local_x,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,59,0)

star_count_node = ((200 < img_node_thresh)).sum()
# print (" Star count at Rank", rank,"is ", star_count_node)

comm.Reduce(star_count_node,total,op=MPI.SUM,root=0) # Reduce to zero process

if comm.rank == 0:
        w2 = MPI.Wtime()
        # print (" Total Stars ", total)
        print (" Total time taken", w2-w1 ,"sec")