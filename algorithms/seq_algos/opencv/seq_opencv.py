##############################################################################################################
#                                       Author - Mehul Warade                                                #
# This program requires image file to be downloaded from https://www.spacetelescope.org/images/heic1502a/    #
#                                                                                                            #
#       Original github repo: https://github.com/swanandM/Galaxy-Star-Count-Mpi4py                           #
##############################################################################################################


import numpy as np
import cv2
from mpi4py import MPI
import os
thisdirname = os.path.dirname(os.path.abspath(__file__))

c = np.array([0],dtype='uint8')
local_x = np.array([0],dtype='uint8')

a = np.empty(([0]),dtype='uint8')
row = None
clm = None

t1 = MPI.Wtime()

# a = np.loadtxt(os.path.join(thisdirname,'heic1502a_15mb.array'), dtype='uint8')

a = np.memmap("15mb.bin", dtype='uint8', mode='r', shape=(1279, 4000))
print(a.shape)

t2 = MPI.Wtime()
print (" Time taken to open and read the image is : %r sec " %(t2-t1))
w1 = MPI.Wtime()

#image processing
img_node_thresh =  cv2.adaptiveThreshold(a,255,cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,59,0)

star_count_node = ((200 < img_node_thresh)).sum()
# print (" Star count at Rank", rank,"is ", star_count_node)
# Total Stars  2286663 for 15mb
w2 = MPI.Wtime()
print (" Total Stars ", star_count_node)
print (" Total time taken", w2-w1 ,"sec")