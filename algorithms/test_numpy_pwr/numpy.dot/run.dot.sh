#!/bin/bash

for SIZE in 7080; do
    echo SIZE: $SIZE
    echo SIZE: $SIZE >> results/result.log

    #https://stackoverflow.com/a/16548827

    echo $(($(date +%s%N)/1000000)) >> results/result.log
    echo ' ' >> results/result.log

    sleep 5
    echo Starting
    python3 dot.py $SIZE >> results/result.log
    echo End
    sleep 5
    
    echo ' ' >> results/result.log
    echo $(($(date +%s%N)/1000000)) >> results/result.log
    echo ' ' >> results/result.log
done

