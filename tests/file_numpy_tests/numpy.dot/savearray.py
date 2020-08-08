import numpy as np
import sys

size = int( sys.argv[1])

numberRows = size
numberColumns = size

np.savetxt('array1/%s.array' %size, np.random.random((size, size)))
np.savetxt('array2/%s.array' %size, np.random.random((size, size)))
