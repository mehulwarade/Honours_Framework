
//NodeJS initialisation

const express = require('express');
const dotenv = require('dotenv');
//https://github.com/motdotla/dotenv/issues/135#issuecomment-254211441
dotenv.config({path: __dirname + '/.env'}); //loading .env file 

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
var telcon = new Telnet();
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
In Mysql query do following (be sure to use password set while setup and root user):

mysql(MAC)-> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';
MariaDB(RPi)-> ALTER USER 'root'@'localhost' IDENTIFIED BY 'Password';
mysql-> FLUSH PRIVILEGES;

https://stackoverflow.com/a/51918364


*/
let mysql = require('mysql');
let sql = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD
});

//Testing connection
sql.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connection Successful!");
});

//Checking databases
sql.query("CREATE DATABASE if not exists" + process.env.MYSQL_DATABASE_NAME, function (err, result) {
  if (err) {
    console.log(process.env.MYSQL_DATABASE_NAME + ": Error or database already exists. Continuing...");
  }else{
  console.log(process.env.MYSQL_DATABASE_NAME + " : database connected.");
  }
});

//Changing to current database
changeDB();

//Check or create table
var q = "CREATE TABLE if not exists test_single_power (timestamp BIGINT(255), p1 FLOAT(12))";
sql.query(q, function (err, result) {
  if (err){
    console.log('Error or table already exists: Power. Continuing...');
  }else{
  console.log("Power: Table connected.");
}});

telcon.connect(params)
.then(() => {
  console.log('telnet connect enter');
  //Following functionality only works for NETGEAR ProSAFE GS110TP switches.
  telcon.send(process.env.LOGIN)
  telcon.send(process.env.PASSWORD)
  telcon.send('enable')
  telcon.send('\n')

    setInterval(() => {
      telcon.send('show poe port info all')
        .then(function(res) {
          pwr[1] = parseFloat(res.slice(1163,1223).slice(15,18))
          // console.log(pwr);   
          // console.log('Updating data...')
          //Can't use anything else because the date changes in bash and nodejs (bash date 01 and nodejs 1)
          var qinsertpwr = "INSERT INTO test_single_power (timestamp, p1) VALUES ("+ Date.now()+","+pwr[1]+")";
          // console.log(qinsertpwr);
          
          sql.query(qinsertpwr, function (err, result) {
            if (err){
              console.log('Error inserting into the table');
            }else{
            console.log("Inserted successfully : Power");
          }});
        })
    }, parseInt(process.env.INTERVAL));

})
.catch(function(error) {
  console.log('Connection to switch error' + error);
})










function changeDB(){
  sql.query('use ' + process.env.MYSQL_DATABASE_NAME, function (err, result) {
    if (err) {
      console.log("Error while changing databases.");
      throw err;
    }else{
    console.log("Working Database changed to " + process.env.MYSQL_DATABASE_NAME);
  }
});
}