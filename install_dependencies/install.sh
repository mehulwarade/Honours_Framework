#!/bin/sh

# PRE-REQUISITE:
# 1. Network booting
# 2. Run this script on each node or on chroot in NFS
# 3. mpi4py (sudo apt install python3-mpi4py)
# 4. dependency - mpirun (sudo apt install openmpi-bin)
# 5. openmpi (sudo apt install openmpi-bin)
# 6. pip (sudo apt install python3-pip)   <== will install pip3 by default
# 7. dependency - libatlas (sudo apt install libatlas-base-dev)
# 8. numpy (sudo pip3 install numpy)



#Needs to be in chroot
echo '======================================================'
echo 'Installing : Pre-Requisites'
echo ''
echo 'mpi4py (sudo apt install python3-mpi4py)'
echo 'dependency - mpirun (sudo apt install openmpi-bin)'
echo 'openmpi (sudo apt install openmpi-bin)'
echo 'pip (sudo apt install python3-pip)'
echo 'dependency - libatlas (sudo apt install libatlas-base-dev)'
echo 'numpy (sudo pip3 install numpy)'

sudo sh install_pre_req.sh
sleep 0.5

echo '======================================================'
echo    'Installing : scikit-learn and dependency'

sudo apt-get install python3-sklearn python3-sklearn-lib
sleep 0.5
