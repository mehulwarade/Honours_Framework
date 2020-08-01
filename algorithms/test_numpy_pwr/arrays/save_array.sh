#!/bin/bash

#Create arrays of size divisible by 2,3,4,5 so that you can experiment with upto 5 threads on each node.
for SIZE in 600 720 840 960 ; do
        python3 savearray.py $SIZE
        sleep 0.5
done

