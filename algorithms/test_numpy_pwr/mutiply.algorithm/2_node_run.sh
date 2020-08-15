#!/bin/bash
echo ' ' >> results/result.cl.log
echo Size: $1
echo SIZE: $1 >> results/result.cl.log

for THREAD in 2;do
    #https://stackoverflow.com/a/16548827
    # echo 'sleeping for 2 minute'
    # sleep 2m
	
	echo THREAD: $THREAD
	echo THREAD: $THREAD >> results/result.cl.log
    echo ' ' >> results/result.cl.log
    echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
    startvalue=$(expr $(($(date +%s%N)/1000000)) - 120000)

    sleep 0.5
    echo Starting
   	mpirun -N $THREAD -hostfile hostfile python3 matrixmultiplication.py $1 >> results/result.cl.log
    echo End
    sleep 0.5

    endvalue=$(expr $(($(date +%s%N)/1000000)) + 120000)
    echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
    echo ' ' >> results/result.cl.log
    echo cl_480_2_node_full p1 $startvalue $endvalue $THREAD>> results/result.cl.log
    echo cl_480_2_node_full p2 $startvalue $endvalue $THREAD>> results/result.cl.log
done
