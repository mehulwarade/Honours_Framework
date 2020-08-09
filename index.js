/* Loading the configuration file and variables */
const global_env = require(__dirname + '/config/configuration.json');

/* NodeJS App initialization [ Needed for GUI ] */
const express = require('express');
const app_port = global_env.app.port
const app = express();

app.listen(app_port, () => {
    console.log('NodeJS app running on port: ' + app_port);
});
app.get('/', function (req, res) {
    res.send(pwr);
});

/* Telnet initialization to connect to Netgear Switch GS110TP */
var Telnet = require('telnet-client');
var telnet_connection = new Telnet();
var params = {
    host: global_env.switch_telnet.IP,
    port: global_env.switch_telnet.port,
    shellPrompt: '/:~[^$]*\$\s*$/',
    timeout: global_env.switch_telnet.interval_to_call,
    shellPrompt: '.',
}
/* Array storing the power values */
var pwr = [];

/* MySQL initialization

Authentication error:
Run Mysql in command prompt (sudo mysql)
In Mysql query do following (be sure to use password set while setup and root user):

mysql(MAC)-> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';
MariaDB(RPi)-> ALTER USER 'root'@'localhost' IDENTIFIED BY 'Password';
mysql-> FLUSH PRIVILEGES;

https://stackoverflow.com/a/51918364

mysql terminal commands:

//To show the output without the fancy lining:
https://stackoverflow.com/a/9558954 

//All mysql queries:
https://gist.github.com/hofmannsven/9164408

//Some mysql command (terminal)
mysql -u [USER] -p [DATABASE_NAME] -ss -e "select * from [TABLE_NAME]"
mysql -u [USER] -p [DATABASE_NAME] -ss -e "select [COLUMN_NAME] from [TABLE_NAME] where [COLUMN_NAME] between [VALUES] and [VALUES]"
mysql -u [USER] -p [DATABASE_NAME] -e "select * from [TABLE_NAME] where [COLUMN_NAME] between [VALUES] and [VALUES]"
mysql -u [USER] -p [DATABASE_NAME] -e "select * from [TABLE_NAME]"

mysql -u root -p mytestdb -ss -e "select * from test_single_power"
mysql -u root -p mytestdb -ss -e "select p1 from test_single_power where timestamp between 1596269829953 and 1596270105047"
mysql -u root -p mytestdb -e "select * from test_single_power where timestamp between 1596269240632 and 1596269402026"
mysql -u root -p mytestdb -e "select * from test_single_power"
*/

let mysql = require('mysql');
let sql = mysql.createConnection({
    host: global_env.db.host,
    user: global_env.db.user,
    password: global_env.db.password
});

/* Testing connection */
sql.connect(function (err) {
    if (err) {
        console.log("Error while connecitng to mysql server.");
        throw err;
    }
    else {
        console.log("MySQL Connection Successful!");
    }
});

/* Checking database or creating one */
sql.query("CREATE DATABASE if not exists" + global_env.db.db_name, function (err, result) {
    if (err) {
        console.log('MYSQL: ' + global_env.db.db_name + ' : Database already exists or error in creating the database');
    }
    else {
        console.log('MYSQL: ' + global_env.db.db_name + ' : Database connected.');
    }

    /* Changing to working database */
    sql.query('use ' + global_env.db.db_name, function (err, result) {
        if (err) {
            console.log("Error while changing databases.");
            throw err;
        }
        else {
            console.log("Working Database changed to : " + global_env.db.db_name);

            /* Checking table or creating one */
            create_table_mysql(global_env.db.table_name);
        }
    });
});
/* MySQL initialization END */




/* Methods */
function create_table_mysql(table_name) {
    /* Checking table or creating one */
    var q = "CREATE TABLE if not exists " + table_name + " (timestamp BIGINT(255), description VARCHAR(255), p1 FLOAT(12), p2 FLOAT(12), p3 FLOAT(12), p4 FLOAT(12), p5 FLOAT(12), p6 FLOAT(12), p7 FLOAT(12))";
    sql.query(q, function (err, result) {
        if (err) {
            console.log('MYSQL: ' + global_env.db.table_name + ' : Table already exists or error in creating the table.');
            throw err;
        }
        else {
            console.log('MYSQL: ' + global_env.db.table_name + ' : Table connected.');
        }
    });
}

