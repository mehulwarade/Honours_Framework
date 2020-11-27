##############################################################################################################
#                                       Author - Mehul Warade                                                #
#          src => https://www.pyimagesearch.com/2019/09/09/multiprocessing-with-opencv-and-python/           #
#                                                                                                            #
##############################################################################################################

# import the necessary packages
import numpy as np
from mpi4py import MPI
import cv2
from datetime import datetime
from imutils import paths
import os
thisdirname = os.path.dirname(os.path.abspath(__file__))

comm = MPI.COMM_WORLD
rank = comm.Get_rank()
size = comm.Get_size()


hashes = {}

def dhash(image, hashSize=8):
	# convert the image to grayscale
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	# resize the input image, adding a single column (width) so we
	# can compute the horizontal gradient
	resized = cv2.resize(gray, (hashSize + 1, hashSize))
	# compute the (relative) horizontal gradient between adjacent
	# column pixels
	diff = resized[:, 1:] > resized[:, :-1]
	# convert the difference image to a hash
	return sum([2 ** i for (i, v) in enumerate(diff.flatten()) if v])

def convert_hash(h):
	return int(np.array(h, dtype="float64"))

def chunk(l, n):
	# loop over the list in n-sized chunks
	for i in range(0, len(l), n):
		# yield the current n-sized chunk to the calling function
		yield l[i: i + n]

def process_images(payload):
	
	tstart = datetime.now()
	for imagePath in payload:
		# load the input image, compute the hash, and conver it
		# print(imagePath)
		image = cv2.imread(imagePath)
		h = dhash(image)
		h = convert_hash(h)
		# update the hashes dictionary
		l = hashes.get(h, [])
		l.append(imagePath)
		hashes[h] = l
	
	# print(hashes)


if rank == 0:
	
	t1 = datetime.now()

	img_path = sorted(list(paths.list_images(os.path.join(thisdirname,"images_hash"))))

	test_chunks = np.array_split(img_path,size)
	t2 = datetime.now()
	# print ("Time taken to create image path list is : %r sec " %(t2-t1).total_seconds())

else:
    test_chunks = None

tstart = datetime.now()
t1 = MPI.Wtime()
test_chunk = comm.scatter(test_chunks,root=0)
# print(test_chunk.shape)

process_images(test_chunk)
comm.Barrier()

if rank == 0:
	tend = datetime.now()
	t2 = MPI.Wtime()
	delta=tend-tstart
	# print(len(hashes))
	# print(" Time : %r sec " %(delta.total_seconds()))
	print(delta.total_seconds())