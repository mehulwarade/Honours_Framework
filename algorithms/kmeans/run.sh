#!/bin/bash
for NODE in 1;do
    satval=$(($(date +%s%N)/1000000))
    echo ' ' >> results/log.log
    echo NODE: $NODE
    echo NODE: $NODE >> results/log.log
    echo ' ' >> results/log.log
    for THREAD in 2 3 4 5 6 7 8 9 10 11 12;do
        #https://stackoverflow.com/a/16548827
        echo 'sleeping for 5 sec'
        sleep 5

        echo THREAD: $THREAD
        echo THREAD: $THREAD >> results/log.log
        echo ' ' >> results/log.log
        stval=$(($(date +%s%N)/1000000))
        echo $stval >> results/log.log
        
        # startvalue=$(expr $(($(date +%s%N)/1000000)) - 120000)

        echo Starting
        mpirun -N $THREAD -hostfile ../hostfile/hostfile$NODE python3 paralKMS.py 5 >> results/log.log
        echo End

        # endvalue=$(expr $(($(date +%s%N)/1000000)) + 120000)
        endval=$(($(date +%s%N)/1000000))
        echo $(expr $endval - $stval) >> results/log.log
        echo $endval >> results/log.log
        
        echo ' ' >> results/log.log
        # echo kmeans p1 $startvalue $endvalue $THREAD >> results/log.log

        echo mysql -u root -pqazwsxedc mytestdb -ss -e '"SELECT avg(p1) from kmeans where timestamp between '$stval' and '$endval';SELECT avg(p2) from kmeans where timestamp between '$stval' and '$endval';SELECT avg(p3) from kmeans where timestamp between '$stval' and '$endval';SELECT avg(p4) from kmeans where timestamp between '$stval' and '$endval';SELECT avg(p5) from kmeans where timestamp between '$stval' and '$endval';SELECT avg(p6) from kmeans where timestamp between '$stval' and '$endval';"' >> results/log.log
        echo ' ' >> results/log.log
    done
done
