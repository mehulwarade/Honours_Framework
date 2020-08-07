#!/bin/bash

for SIZE in 36; do
# for SIZE in 600 720 840 960; do
    echo SIZE: $SIZE
    echo SIZE: $SIZE >> results/result.log
    echo $(($(date +%s%N)/1000000)) >> results/result.log
    echo ' ' >> results/result.log
    
    for TEST in 1 2 3; do
    # for TEST in 1 2 3 4 5 6 7 8 9 10; do    
        echo Test Number: $TEST
        sleep 5
        echo Starting
        python3 dot.py $SIZE >> results/result.log
        echo End
        sleep 5
    
    done
    echo ' ' >> results/result.log
    echo $(($(date +%s%N)/1000000)) >> results/result.log
    echo ' ' >> results/result.log
done

