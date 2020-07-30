# To RUN:
README written for NETGEAR ProSAFE GS110TP switch.

## Testing the code!

```npm install```

Edit the  ```.env``` file in the ```switch_connect``` folder to use the variables for your setup.

```npm start```

Goto ```http://localhost:8000```


### Command Line Interface (to play around switch CLI)

In terminal (Most Netgear switches have a telnet server on port 60000)

```s
telnet ip_address_of_switch port
telnet 192.168.50.150 60000
admin
password
enable
"Enter"
show poe port info all
```


### References
```r
https://www.downloads.netgear.com/docs/m4100/enu/202-11161-01/cli.pdf
https://www.simweb.ch/blog/2014/02/hidden-cli-interface-on-netgear-gs110tp/#comment-6565
https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786 
```