/*
  <=====  Initialisation for the node project ===========>
*/
const express = require('express');
var Telnet = require('telnet-client');
const dotenv = require('dotenv');
dotenv.config(); //loading .env file

const port = process.env.PORT || 8000
const app = express();

var connection = new Telnet();
var params = {
  host: process.env.SWITCH_IP,
  port: process.env.SWITCH_TELNET_PORT,
  shellPrompt: process.env.PROMPT_1,
  timeout: parseInt(process.env.TIMEOUT),
  shellPrompt: process.env.PROMPT_2,
}

var pwr = [];

app.listen(port, () => {
  console.log(`API server port: ${port}`);
});
app.get('/', function(req, res) {
  res.send(pwr);
});
/*
  <======  End initialisation ==========>
*/

connection.connect(params)
.then(() => {
  //Following functionality only works for NETGEAR ProSAFE GS110TP switches.
  connection.send(process.env.LOGIN)
  connection.send(process.env.PASSWORD)
  connection.send('enable')
  connection.send('\n')

    setInterval(() => {
        connection.send('show poe port info all')
        .then(function(res) {
            // console.log(res.slice(1163,1586))
            var port1 = res.slice(1163,1223)
            var port2 = res.slice(1224,1284)
            var port3 = res.slice(1285,1345)
            var port4 = res.slice(1346,1406)
            var port5 = res.slice(1407,1467)
            var port6 = res.slice(1468,1528)
            var port7 = res.slice(1529,1589)

            // console.log(port1)  
            // console.log(port2)
            // console.log(port3)
            // console.log(port4)
            // console.log(port5)
            // console.log(port6)
            // console.log(port7)

            pwr[0] = "dynamic power usage (Index = port number)"
            pwr[1] = parseFloat(port1.slice(15,18))
            pwr[2] = parseFloat(port2.slice(15,18))
            pwr[3] = parseFloat(port3.slice(15,18))
            pwr[4] = parseFloat(port4.slice(15,18))
            pwr[5] = parseFloat(port5.slice(15,18))
            pwr[6] = parseFloat(port6.slice(15,18))
            pwr[7] = parseFloat(port7.slice(15,18))

            console.log('Updating data...')

            // console.log("Port 1 power: " + port1.slice(15,18));       
        })
    }, 500);
  
}, function(error) {
  console.log('promises reject:', error)
})
.catch(function(error) {
  // handle the throw (timeout)
})