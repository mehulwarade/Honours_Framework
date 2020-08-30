#!/bin/bash
echo ' ' >> log.log
echo Size: $1
echo SIZE: $1 >> log.log
echo ' ' >> log.log
for NODE in 2 3 5 6;do
    satval=$(($(date +%s%N)/1000000))
    echo ' ' >> log.log
    echo NODE: $NODE
    echo NODE: $NODE >> log.log
    echo ' ' >> log.log
    for THREAD in 6;do
        #https://stackoverflow.com/a/16548827
        echo 'sleeping for 5 sec'
        sleep 5

        echo THREAD: $THREAD
        echo THREAD: $THREAD >> log.log
        echo ' ' >> log.log
        echo $(($(date +%s%N)/1000000)) >> log.log
        stval=$(($(date +%s%N)/1000000))
        # startvalue=$(expr $(($(date +%s%N)/1000000)) - 120000)

        sleep 0.5
        echo Starting
        mpirun -N $THREAD -hostfile ../hostfile/hostfile$NODE python3 matrixmultiplication.py $1 >> log.log
        echo End
        sleep 0.5

        # endvalue=$(expr $(($(date +%s%N)/1000000)) + 120000)
        echo $(($(date +%s%N)/1000000)) >> log.log
        endval=$(($(date +%s%N)/1000000))
        echo ' ' >> log.log
        # echo power_4_node_all p1 $startvalue $endvalue $THREAD >> log.log

        echo "SELECT avg(p1) from power_4_node_all where timestamp between $stval and $endval;" >> log.log
        echo "SELECT avg(p2) from power_4_node_all where timestamp between $stval and $endval;" >> log.log
        echo "SELECT avg(p3) from power_4_node_all where timestamp between $stval and $endval;" >> log.log
        echo "SELECT avg(p4) from power_4_node_all where timestamp between $stval and $endval;" >> log.log
        echo "SELECT avg(p5) from power_4_node_all where timestamp between $stval and $endval;" >> log.log
        echo "SELECT avg(p6) from power_4_node_all where timestamp between $stval and $endval;" >> log.log

    done
done
