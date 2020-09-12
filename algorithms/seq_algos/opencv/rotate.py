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

t1 = MPI.Wtime()
img = np.loadtxt(os.path.join(thisdirname,'heic1502a_15mb.array'), dtype='uint8')

t2 = MPI.Wtime()
print (" Time taken to open and read the image is : %r sec " %(t2-t1))

rows,cols = img.shape

w1 = MPI.Wtime()
M = cv2.getRotationMatrix2D((cols/2,rows/2),90,1)
dst = cv2.warpAffine(img,M,(cols,rows))

w2 = MPI.Wtime()
print (" Total time taken", w2-w1 ,"sec")