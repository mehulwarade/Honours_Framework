#!/bin/bash

for SIZE in 36 60 120 144; do
        python3 savearray.py $SIZE
        sleep 0.5
done

