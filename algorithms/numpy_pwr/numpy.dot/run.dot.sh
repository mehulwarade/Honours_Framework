#!/bin/sh
echo ' ' >> results/result.log
echo SIZE: $1
echo SIZE: $1 >> results/result.log

#https://stackoverflow.com/a/16548827

echo $(($(date +%s%N)/1000000)) >> results/result.log
echo ' ' >> results/result.log
startvalue=$(expr $(($(date +%s%N)/1000000)) - 120000)
sleep 0.5
echo Starting
python3 dot.py $1 >> results/result.log
echo End
sleep 0.5
endvalue=$(expr $(($(date +%s%N)/1000000)) + 120000)
echo ' ' >> results/result.log
echo $(($(date +%s%N)/1000000)) >> results/result.log
echo ' ' >> results/result.log
echo cl_480_2_node_full p1 $startvalue $endvalue >> results/result.cl.log
echo cl_480_2_node_full p2 $startvalue $endvalue >> results/result.cl.log

