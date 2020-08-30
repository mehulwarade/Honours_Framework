# Honours_Framework
Framework for evaluation of Parallel Algorithms on Cluster


## Installation

Installing dependencies for the nodeJS.
Tested connection on 'NETGEAR ProSAFE GS110TP switches'

```s
cd switch_connect
npm install
```

Edit the  ```.env``` file in the ```switch_connect``` folder to use the variables for your setup.

### MySQL installation

Need MySQL server installed on local machine




# Running from scratch (Debian 10):
### RPi netboot. (location: /nfs/client/home/pi/** <= so that its accessible to other nodes =>)
`sudo apt-get update`

`sudo apt install npm`

<!-- Only if needed -->
`sudo apt install nodejs`
    `=> node -v`

`sudo apt install mariadb-server`
    `=> sudo mysql_secure_installation`