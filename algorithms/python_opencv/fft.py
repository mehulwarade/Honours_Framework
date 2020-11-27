##############################################################################################################
#                                       Author - Mehul Warade                                                #
# This program requires image file to be downloaded from https://www.spacetelescope.org/images/heic1502a/    #
#                                                                                                            #
##############################################################################################################


import numpy as np
# import cv2
from mpi4py import MPI
import os
thisdirname = os.path.dirname(os.path.abspath(__file__))

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()
a = np.empty(([0]),dtype='uint8')

fname="bridge.bin"
# row, clm = (1279, 4000)
# row, clm = (5000, 3197)
row, clm = (3840, 2400)

# 120mb array size (10000, 3197) Stars seq  21512963 par => 21512963
# 15mb qarray size (1279, 4000) Stars seq  2286663 par =>  2286679

if rank == 0:
        t1 = MPI.Wtime()
        # a = np.loadtxt(os.path.join(thisdirname,fname), dtype='uint8')

        a = np.memmap(os.path.join(thisdirname,fname), dtype='uint8', mode='r', shape=(row, clm))
    
        t2 = MPI.Wtime()
        print (" Time taken to open and read the image is : %r sec " %(t2-t1))

        test_chunks = np.array_split(a,size,axis=0)
else:
        test_chunks = None

# comm.Barrier()

w1 = MPI.Wtime()

test_chunk = comm.scatter(test_chunks,root=0)

# print(test_chunk)


# print(fshift.shape)

for i in range(5):
        fshift = np.fft.fftshift(np.fft.fft2(test_chunk))
        magnitude_spectrum = 20*np.log(np.abs(fshift))
        print (" Magnitude array shape at Rank", rank,"is ", magnitude_spectrum.shape)
        del magnitude_spectrum, fshift

if comm.rank == 0:
        w2 = MPI.Wtime()
        # print (" Total Magtitude ", magnitude_spectrum.shape)
        print (" Total time taken", w2-w1 ,"sec")
        # del a