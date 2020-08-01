#!/bin/bash

for SIZE in 960 1920; do
		for TEST in 3 4 5 6 7 8 9 10; do
			mpirun -np 2 --hostfile hostfile python3 matrixmultiplication.py $SIZE >> results/seq/$SIZE.log
			sleep 0.5
		done			
done
