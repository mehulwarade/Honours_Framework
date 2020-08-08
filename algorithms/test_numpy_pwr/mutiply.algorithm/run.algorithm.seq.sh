#!/bin/bash

echo Size: $1
echo SIZE: $1 >> results/result.seq.log
for NODE in 1 2 3 4 5;do
    #https://stackoverflow.com/a/16548827

    echo $(($(date +%s%N)/1000000)) >> results/result.seq.log
    echo ' ' >> results/result.seq.log
	
	echo NODE: $NODE
	echo NODE: $NODE >> results/result.seq.log
    echo ' ' >> results/result.seq.log
    sleep 5
    echo Starting
   	mpirun -np $NODE --hostfile hostfile python3 matrixmultiplication.py $1 >> results/result.seq.log
    echo End
    sleep 5
    
    echo ' ' >> results/result.seq.log
    echo $(($(date +%s%N)/1000000)) >> results/result.seq.log
    echo ' ' >> results/result.seq.log
done


sleep 0.5
