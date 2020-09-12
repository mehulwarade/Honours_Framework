#  https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_imgproc/py_transforms/py_fourier_transform/py_fourier_transform.html
import numpy as np
# import cv2
from mpi4py import MPI
import os
thisdirname = os.path.dirname(os.path.abspath(__file__))

t1 = MPI.Wtime()
# img = np.loadtxt(os.path.join(thisdirname,'heic1502a_15mb.array'), dtype='uint8')
# img = np.loadtxt(os.path.join(thisdirname,'heic1502a_120mb.array'), dtype='uint8') 
# (10000, 3197)

# img = np.memmap(os.path.join(thisdirname,'heic1502a_120mb.array'), dtype='uint8', mode='r', shape=(9000, 3197))

# t2 = MPI.Wtime()

# print (" Time taken to open and read the image is : %r sec " %(t2-t1))


t5 = MPI.Wtime()
img = np.memmap("15mb.bin", dtype='uint8', mode='r', shape=(1279, 4000))
print(img.shape)
t6 = MPI.Wtime()

print (" Time taken to open and read the image is : %r sec " %(t6-t5))

w3 = MPI.Wtime()

# exit()

fshift = np.fft.fftshift(np.fft.fft2(img))
print(fshift.shape)

magnitude_spectrum = 20*np.log(np.abs(fshift))
print(magnitude_spectrum.shape)
w4 = MPI.Wtime()
print (" Total time taken", w4-w3 ,"sec")

# w1 = MPI.Wtime()

# dft_shift = np.fft.fftshift(cv2.dft(np.int8(img),flags = cv2.DFT_COMPLEX_OUTPUT))
# print(dft_shift.shape)
# magnitude_spectrum = 20*np.log(cv2.magnitude(dft_shift[:,:,0],dft_shift[:,:,1]))

# print(magnitude_spectrum.shape)
# w2 = MPI.Wtime()
# print (" Total time taken", w2-w1 ,"sec")
