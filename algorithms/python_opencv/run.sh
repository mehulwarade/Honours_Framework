#!/bin/bash
for NODE in 3 4 5;do
    echo ' ' >> log.log
    echo NODE: $NODE
    echo NODE: $NODE >> log.log
    echo ' ' >> log.log
    for THREAD in 1 2 3 4 5 6 7 8;do
        #https://stackoverflow.com/a/16548827
        echo 'sleeping for 5 sec'
        sleep 5

        echo THREAD: $THREAD
        echo THREAD: $THREAD >> log.log
        echo ' ' >> log.log
        stval=$(($(date +%s%N)/1000000))
        echo $stval >> log.log
        
        # startvalue=$(expr $(($(date +%s%N)/1000000)) - 120000)``

        echo Starting
        mpirun -N $THREAD -hostfile ../hostfile/hostfile$NODE python3 opencv.py >> log.log
        echo End

        # endvalue=$(expr $(($(date +%s%N)/1000000)) + 120000)
        endval=$(($(date +%s%N)/1000000))
        echo $(expr $endval - $stval) >> log.log
        echo $endval >> log.log
        
        echo ' ' >> log.log
        # echo kmeans p1 $startvalue $endvalue $THREAD >> log.log

    done
done
