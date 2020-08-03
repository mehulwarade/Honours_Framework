from __future__ import print_function

import numpy as np
from time import time
import sys

size = int( sys.argv[1])
print('Loading Array1 into memory')
A = np.loadtxt('../arrays/array1/%s.array' %size, dtype='uint8')
print('Loading Array2 into memory')
B = np.loadtxt('../arrays/array2/%s.array' %size, dtype='uint8')
print('Calculating...')
t = time()
np.dot(A, B)
# print(np.dot(A,B)) #python3 dot.py 120 ####check result
delta = time() - t
print(delta)

del A, B