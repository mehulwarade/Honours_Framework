# https://towardsdatascience.com/python-opencv-building-instagram-like-image-filters-5c482c1c5079

from mpi4py import MPI
import cv2
import os
import numpy as np
from scipy.interpolate import UnivariateSpline

thisdirname = os.path.dirname(os.path.abspath(__file__))

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()
test_chunk = np.empty(([0]),dtype='uint8')

fname="bridge.jpg"
row, clm = (3840, 2400)

if rank == 0:
        t1 = MPI.Wtime()
        a = cv2.imread(os.path.join(thisdirname,fname))
        t2 = MPI.Wtime()
        # print (" Time taken to open and read the image is : %r sec " %(t2-t1))

        test_chunks = np.array_split(a,size,axis=0)
else:
        test_chunks = None


test_chunk = comm.scatter(test_chunks,root=0)

# print(test_chunk)

def gaussianBlur(image):
    return cv2.GaussianBlur(image, (35, 35), 0)
    

def sepia(image):
    kernel = np.array([[0.272, 0.534, 0.131],
                       [0.349, 0.686, 0.168],
                       [0.393, 0.769, 0.189]])
    return cv2.filter2D(image, -1, kernel)
    

def emboss(image):
    kernel = np.array([[0,-1,-1],
                            [1,0,-1],
                            [1,1,0]])
    return cv2.filter2D(image, -1, kernel)
    

def brightnessControl(image, level):
    return cv2.convertScaleAbs(image, beta=level)
    

def spreadLookupTable(x, y):
    spline = UnivariateSpline(x, y)
    return spline(range(256))
    

def warmImage(image):
    increaseLookupTable = spreadLookupTable([0, 64, 128, 256], [0, 80, 160, 256])
    decreaseLookupTable = spreadLookupTable([0, 64, 128, 256], [0, 50, 100, 256])
    red_channel, green_channel, blue_channel = cv2.split(image)
    red_channel = cv2.LUT(red_channel, increaseLookupTable).astype(np.uint8)
    blue_channel = cv2.LUT(blue_channel, decreaseLookupTable).astype(np.uint8)
    return cv2.merge((red_channel, green_channel, blue_channel))
    

def coldImage(image):
    increaseLookupTable = spreadLookupTable([0, 64, 128, 256], [0, 80, 160, 256])
    decreaseLookupTable = spreadLookupTable([0, 64, 128, 256], [0, 50, 100, 256])
    red_channel, green_channel, blue_channel = cv2.split(image)
    red_channel = cv2.LUT(red_channel, decreaseLookupTable).astype(np.uint8)
    blue_channel = cv2.LUT(blue_channel, increaseLookupTable).astype(np.uint8)
    return cv2.merge((red_channel, green_channel, blue_channel))

w1 = MPI.Wtime()

for i in range(5):
    # print(test_chunk)

    # print('blur')
    blur = gaussianBlur(test_chunk)

    # print('sepia')
    sepiaa = sepia(test_chunk)

    # print('emboss')
    embossa = emboss(test_chunk)

    # print('bright')
    bright = brightnessControl(test_chunk,100)

    # print('warm')
    warm = warmImage(test_chunk)

    # print('cold')
    cold = coldImage(test_chunk)

    del blur, sepiaa, embossa, bright, warm, cold

comm.Barrier()

if comm.rank == 0:
        w2 = MPI.Wtime()
        print (w2-w1)