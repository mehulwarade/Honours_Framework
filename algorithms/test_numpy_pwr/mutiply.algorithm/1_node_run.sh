#!/bin/bash

echo Size: $1
echo SIZE: $1 >> results/result.cl.log

for THREAD in 2 3;do
    #https://stackoverflow.com/a/16548827
	
	echo THREAD: $THREAD
	echo THREAD: $THREAD >> results/result.cl.log
    echo ' ' >> results/result.cl.log
    echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
    
    sleep 0.5
    echo Starting
   	mpirun -np $THREAD python3 matrixmultiplication.py $1 >> results/result.cl.log
    echo End
    sleep 0.5

    echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
    echo ' ' >> results/result.cl.log
done
