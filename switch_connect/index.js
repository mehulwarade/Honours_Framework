
//NodeJS initialisation

const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); //loading .env file
const port = process.env.PORT || 8000
const app = express();

app.listen(port, () => {
  console.log(`API server port: ${port}`);
});
app.get('/', function(req, res) {
  res.send(pwr);
});

//Telnet initialisation
var Telnet = require('telnet-client');
var connection = new Telnet();
var params = {
  host: process.env.SWITCH_IP,
  port: process.env.SWITCH_TELNET_PORT,
  shellPrompt: process.env.PROMPT_1,
  timeout: parseInt(process.env.TIMEOUT),
  shellPrompt: process.env.PROMPT_2,
}

var pwr = [];


//MySQL initialisation
/*
Authentication error:
Run Mysql in command prompt (sudo mysql)
In Mysql query do following (be sure to use root password and root user):

mysql-> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
mysql-> FLUSH PRIVILEGES;

https://stackoverflow.com/a/51918364


*/
let mysql = require('mysql');
let sql = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD
});

sql.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connection Successful!");
  
  sql.query("CREATE DATABASE " + process.env.MYSQL_DATABASE_NAME, function (err, result) {
    if (err) {
      console.log(process.env.MYSQL_DATABASE_NAME + ": Error while creating or database already exists.");
    }else{
    console.log(process.env.MYSQL_DATABASE_NAME + " : database created");
    }
  });
});

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
    }, parseInt(process.env.INTERVAL));
  
}, function(error) {
  console.log('promises reject:', error)
})
.catch(function(error) {
  // handle the throw (timeout)
})