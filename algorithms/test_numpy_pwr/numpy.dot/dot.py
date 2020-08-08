from __future__ import print_function

import numpy as np
from time import time
import sys

size = int( sys.argv[1])

A = np.loadtxt('../%s.1.array' %size, dtype='uint8')

B = np.loadtxt('../%s.2.array' %size, dtype='uint8')

t = time()
np.dot(A, B)
# print(np.dot(A,B)) #python3 dot.py 120 ####check result
delta = time() - t
print(delta)

del A, B