#!/bin/bash

echo Size: $1
echo SIZE: $1 >> results/result.cl.log

for THREAD in 1 2 3 4 5;do
    #https://stackoverflow.com/a/16548827

    echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
    echo ' ' >> results/result.cl.log
	
	echo THREAD: $THREAD
	echo THREAD: $THREAD >> results/result.cl.log
    echo ' ' >> results/result.cl.log
    sleep 5
    echo Starting
   	mpirun -N $THREAD --hostfile hostfile python3 matrixmultiplication.py $1 >> results/result.cl.log
    echo End
    sleep 5
    
    echo ' ' >> results/result.cl.log
    echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
    echo ' ' >> results/result.cl.log
done


sleep 0.5



	for CPU in 3 5 7 9 11 13 15; do
	echo Threads: $CPU >> results/2node.log
		for TEST in 1 2 3 4 5 6 7 8 9 10; do
			mpirun -np $CPU --hostfile hostfile --map-by node python3 matrixmultiplication.py $SIZE >> results/result.cl.log
			sleep 0.5
		done
	done			

