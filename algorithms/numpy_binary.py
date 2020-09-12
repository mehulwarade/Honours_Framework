import numpy as np
import cv2
from mpi4py import MPI
import os
thisdirname = os.path.dirname(os.path.abspath(__file__))

# a=array (load it in following)
# a = np.loadtxt(os.path.join(thisdirname,'heic1502a_15mb.array'), dtype='uint8')

# Write to binary file
# a.tofile("15mb.bin")

# read a binqary file
# a = np.fromfile("15mb.bin",  dtype=np.int8) #fast but a bit slow as loads into ram
# a = np.memmap("15mb.bin", dtype='uint8', mode='r', shape=(1279, 4000))    #Very fast
print(a.shape)
       