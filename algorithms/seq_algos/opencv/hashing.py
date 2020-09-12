##############################################################################################################
#                                       Author - Mehul Warade                                                #
#          src => https://www.pyimagesearch.com/2019/09/09/multiprocessing-with-opencv-and-python/           #
#                                                                                                            #
##############################################################################################################

# import the necessary packages
import numpy as np
# import pickle
import cv2
from datetime import datetime
from imutils import paths

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
	hashes = {}
	tstart = datetime.now()
	for imagePath in payload:
		# load the input image, compute the hash, and conver it
		print(imagePath)
		image = cv2.imread(imagePath)
		h = dhash(image)
		h = convert_hash(h)
		# update the hashes dictionary
		l = hashes.get(h, [])
		l.append(imagePath)
		hashes[h] = l
	
	tend = datetime.now()
	delta=tend-tstart

	print(delta.microseconds)
	print(delta.total_seconds())
	# print(hashes)


process_images(sorted(list(paths.list_images("./images_hash"))))