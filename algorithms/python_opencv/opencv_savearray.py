import numpy as np
import cv2
import os

fname="bridge"
thisdirname = os.path.dirname(os.path.abspath(__file__))
img = cv2.imread(os.path.join(thisdirname,"{}.jpg".format(fname)),0) #Read the image 
a = np.array(img)  #Convert to a Matrix
row,clm = a.shape

# Store as txt
# np.savetxt("{}.array".format(fname), a,fmt='%d')
# can load using loadtxt or nmap
# b = np.loadtxt(os.path.join(thisdirname,'{}.array'.format(fname)), dtype='uint8')
# np.memmap("{}.bin".format(fname), dtype='uint8', mode='r', shape=(row, clm))

# Store as binary
a.tofile("{}.bin".format(fname))
# can load using fromfile or nmap
# a = np.fromfile("{}.bin".format(fname),  dtype=np.int8)
# np.memmap("{}.bin".format(fname), dtype='uint8', mode='r', shape=(row, clm))