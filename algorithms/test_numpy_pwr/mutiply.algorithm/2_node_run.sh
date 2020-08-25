#!/bin/bash
echo ' ' >> results/result.cl.log
echo Size: $1
echo SIZE: $1 >> results/result.cl.log
echo ' ' >> results/result.cl.log
for NODE in 2 3 5 6;do
    satval=$(($(date +%s%N)/1000000))
    echo ' ' >> results/result.cl.log
    echo NODE: $NODE
    echo NODE: $NODE >> results/result.cl.log
    echo ' ' >> results/result.cl.log
    for THREAD in 6;do
        #https://stackoverflow.com/a/16548827
        echo 'sleeping for 5 sec'
        sleep 5

        echo THREAD: $THREAD
        echo THREAD: $THREAD >> results/result.cl.log
        echo ' ' >> results/result.cl.log
        echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
        stval=$(($(date +%s%N)/1000000))
        # startvalue=$(expr $(($(date +%s%N)/1000000)) - 120000)

        sleep 0.5
        echo Starting
        mpirun -N $THREAD -hostfile hostfile$NODE python3 matrixmultiplication.py $1 >> results/result.cl.log
        echo End
        sleep 0.5

        # endvalue=$(expr $(($(date +%s%N)/1000000)) + 120000)
        echo $(($(date +%s%N)/1000000)) >> results/result.cl.log
        endval=$(($(date +%s%N)/1000000))
        echo ' ' >> results/result.cl.log
        # echo power_4_node_all p1 $startvalue $endvalue $THREAD >> results/result.cl.log

        echo "SELECT avg(p1) from power_4_node_all where timestamp between $stval and $endval;" >> results/result.cl.log
        echo "SELECT avg(p2) from power_4_node_all where timestamp between $stval and $endval;" >> results/result.cl.log
        echo "SELECT avg(p3) from power_4_node_all where timestamp between $stval and $endval;" >> results/result.cl.log
        echo "SELECT avg(p4) from power_4_node_all where timestamp between $stval and $endval;" >> results/result.cl.log
        echo "SELECT avg(p5) from power_4_node_all where timestamp between $stval and $endval;" >> results/result.cl.log
        echo "SELECT avg(p6) from power_4_node_all where timestamp between $stval and $endval;" >> results/result.cl.log

    done
done
