##############################################################################################################
#                                       Author - Mehul Warade                                                #
#                           Showing the workings of bcast scatter gather in Mpi4Py                           #
#                                                                                                            #
##############################################################################################################

import numpy as np
from mpi4py import MPI

row=4
clm=5
# row=None
# clm=None
comm = MPI.COMM_WORLD
size = comm.Get_size()
rank = comm.Get_rank()

if rank == 0:

    # a = np.loadtxt('heic1502a_15mb.array', dtype='uint8')

    a = np.random.randint(1,20,size=(row,clm),dtype='uint8')
    print(a)
    print(a.shape)
    row = a.shape[0]
    clm = a.shape[1]
    test_chunks = np.array_split(a,size,axis=0)
    
else:
    test_chunks = None

row = comm.bcast(row, root=0)
clm = comm.bcast(clm, root=0)

test_chunk = comm.scatter(test_chunks,root=0)
print('After Scatterv, process {} has data:'.format(rank), test_chunk.shape)
# print(test_chunk)
output_chunk = np.zeros([np.shape(test_chunk)[0],clm],dtype='uint8')

for i in range(0,np.shape(test_chunk)[0],1):
    # print(i)
    output_chunk[i,0:clm] = test_chunk[i]
    # print(output_chunk)

outputData = comm.gather(output_chunk,root=0)


# if rank == 0:
#     print(outputData)
#     outputData = np.concatenate(outputData,axis = 0)