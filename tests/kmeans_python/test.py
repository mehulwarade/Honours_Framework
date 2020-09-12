# import libraries
import numpy as np
from mpi4py import MPI
import csv

# MPI initialization
comm = MPI.COMM_WORLD
rank= comm.Get_rank()
size = comm.Get_size()

# Functions and Classes
def num_row(data):
    return data.shape[0]
def num_col(data):
    return data.shape[1]

class cluster:
    def __init__(self, data, centroid,k):
        self.data = data
        self.centroid = centroid
        self.k = k # number of cluster
    
    def calc_distance(self): # return the distance matrix
        data = self.data
        centroid = self.centroid
        #centroid = centroid.T 
        
        distance = np.empty((num_row(data), k)) # n by k matrix
        
        for i in range(num_row(data)):
            temp = [np.linalg.norm(data[i] - elem) for elem in centroid] # euclidean distance
            distance[i] = temp # fill in each row of distance matrix with distance between each data point with all centroids            
        return distance
    
    def membership(self): # return the membership matrix
        distance = self.calc_distance()
        membership = np.zeros((num_row(distance),2)) # n by 2 matrix
        for i in range(num_row(distance)):
            membership[i][0] = i # just for index
            membership[i][1] = np.argmin(distance[i]) # assign cluster number from 0
        return membership

class new_cluster:
    def __init__(self, data, member,k):
        self.data = data
        self.member = member
        self.k = k
        
    def calc_centroid(self):
        data = self.data
        member= self.member
        new_centroid = np.empty((k,num_col(data))) # k by m matrix
        for i in range(k):
            group = member[:,0][member[:,1]==i] # extract all indexes that belongs to i-th cluster          
            for j in group:
                new_centroid[i] = data[j].mean() # new centroid for that cluster is mean of all data points that belong to that cluster
        return new_centroid

# start time
t1 = MPI.Wtime()

# number of clusters
k=4

# number of iterations
time = 0

# read data
f  = open('3D_spatial_network.csv', "rt", encoding="utf8")
reader = csv.reader(f)
data = list(reader)
    
data.pop(0)
for i in range (len(data)):
    data[i].pop(0)
# should be divisible by 2,3,4,5
data=data[0:100]
data=np.array(data).astype(np.float)
print(data.shape)
# initialize centroids by randomly selcting k points from the data

centroids = np.array([0])

for i in range(k):
    centroids = np.append(centroids, data[i])
    
print(centroids.shape)
#centroids

  