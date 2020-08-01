#!/bin/bash

for SIZE in 36 60 120 144; do
    echo SIZE: $SIZE >> results/result.log
    for TEST in 1 2 3 4 5 6 7 8 9 10; do
        python3 dot.py $SIZE >> results/result.log
        sleep 0.5
    done

    echo ' ' >> results/result.log
done

