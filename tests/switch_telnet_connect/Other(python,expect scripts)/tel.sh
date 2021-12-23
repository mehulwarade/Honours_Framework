#!/bin/sh

HOST='192.168.5.23 60000'
USER='admin'
PASSWD='password'
CMD='?'

(
echo open "$HOST"
sleep 2
echo "$USER"
sleep 2
echo "$PASSWD"
sleep 2
echo "enable"
sleep 2
echo ""
echo "show poe port info 0/1"
sleep 2
echo "$CMD"
sleep 2
echo "exit"
) | telnet
