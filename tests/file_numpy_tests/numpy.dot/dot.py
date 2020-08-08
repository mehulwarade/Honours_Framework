from __future__ import print_function

import numpy as np
from time import time
import sys

size = int( sys.argv[1])

A = np.loadtxt('array1/%s.array' %size)
B = np.loadtxt('array2/%s.array' %size)

t = time()
np.dot(A, B)
# print(np.dot(A,B)) #python3 dot.py 120 ####check result
delta = time() - t
print(delta)

del A, B