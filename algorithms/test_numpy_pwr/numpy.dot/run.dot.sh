#!/bin/sh

echo SIZE: $1
echo SIZE: $1 >> results/result.log

#https://stackoverflow.com/a/16548827

echo $(($(date +%s%N)/1000000)) >> results/result.log
echo ' ' >> results/result.log

sleep 5
echo Starting
python3 dot.py $1 >> results/result.log
echo End
sleep 5

echo ' ' >> results/result.log
echo $(($(date +%s%N)/1000000)) >> results/result.log
echo ' ' >> results/result.log

