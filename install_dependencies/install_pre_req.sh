# Run this file after network booting works.
# Run this on the clients and not on the boot node.
# Run this as chroot in the boot node as it requires internet connection.


#Needs to be in chroot
echo '======================================================'
echo '    Installing : Mpi4Py (python3)'

sudo apt install python3-mpi4py
sleep 0.5

echo '======================================================'
echo    'Installing : OpenMPI-BIN (dependency for mpirun)'

sudo apt install openmpi-bin    #dependency for 'mpirun'
sleep 0.5

echo '======================================================'
echo    'Installing : pip (python3)'

sudo apt install python3-pip
sleep 0.5

echo '======================================================'
echo    'Installing : LibAtlas dependency'

sudo apt install libatlas-base-dev
sleep 0.5

echo '======================================================'
echo    'Installing : numpy (using pip)'

sudo pip3 install numpy
sleep 0.5