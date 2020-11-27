# https://towardsdatascience.com/python-opencv-building-instagram-like-image-filters-5c482c1c5079


import cv2
import os
import numpy as np
from scipy.interpolate import UnivariateSpline

thisdirname = os.path.dirname(os.path.abspath(__file__))

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

initialImage = cv2.imread(os.path.join(thisdirname,"bridge.jpg"))
# print(initialImage)

# Blur
for i in range(5):
    print('blur')
    blurredImage = gaussianBlur(initialImage)
    # cv2.imwrite("blurred.jpg", blurredImage)
    print('sepia')
    # Sepia effect
    sepiaImage = sepia(initialImage)
    # cv2.imwrite("sepia.jpg", sepiaImage)
    print('emboss')
    # Emboss effect
    EmbossImage = emboss(initialImage)
    # cv2.imwrite("emboss.jpg", EmbossImage)
    print('bight')
    # Brightness
    brightness = brightnessControl(initialImage,100)
    # cv2.imwrite("brightness.jpg", brightness)
    print('warm')
    # Warm and cold images
    warm = warmImage(initialImage)
    # cv2.imwrite("warm.jpg", warm)
    print('cold')
    cold = coldImage(initialImage)
    # cv2.imwrite("cold.jpg", cold)