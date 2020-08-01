#!/bin/bash

for SIZE in 36 60 120 144; do
	echo SIZE: $SIZE >> results/2node.log
	for CPU in 3 5 7 9 11 13 15; do
	echo Threads: $CPU >> results/2node.log
		for TEST in 1 2 3 4 5 6 7 8 9 10; do
			mpirun -np $CPU --hostfile hostfile --map-by node python3 matrixmultiplication.py $SIZE >> results/2node.log
			sleep 0.5
		done
	done			
done
