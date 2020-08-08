import numpy as np
import sys

size = int( sys.argv[1])

numberRows = numberColumns = size

array1 = np.random.randint(100,size=(size, size)).astype('uint8')
np.savetxt('%s.1.array' %size, array1.astype(int),fmt='%d')
del array1

array2 = np.random.randint(100,size=(size, size)).astype('uint8')
np.savetxt('%s.2.array' %size, array2.astype(int),fmt='%d')

del array2