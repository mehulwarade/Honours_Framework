const functions = require('./methods');
const telnet = require('./telnet');

const editJsonFile = require("edit-json-file");

let data_file = editJsonFile(functions.getDataFilePath(), {
    autosave: true
});


const chalk = require('chalk');

var config_path = functions.getConfigPath(); /* Always put this after declaring functions */
global_env = require(config_path);

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
const mysql = require('mysql');
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require('constants');

sql = mysql.createConnection({
    host: global_env.db.host,
    user: global_env.db.user,
    password: global_env.db.password
});


module.exports = {
    db_connect: async (callback) => {
        await functions.spinnerStart('Testing connection to mysql server...');

        /* This following is to simulate 1 second delay to show the spinner */
        /* return sql   <- Also works */
        /* Callback info: https://stackoverflow.com/a/23340273 */
        /*Callback for mysql:npm https://www.npmjs.com/package/mysql */
        await functions.delay(1000);

        await sql.connect(async (err) => {
            if (err) {
                console.log(chalk.red('Connection to Mysql server failed.'));
                functions.spinnerStop();
                console.log(chalk.red('Stop all services and try again. The program will end.'));
                await functions.delay(500);
                process.exit();
            }
            else {
                console.log(chalk.green('MySQL connection successfull!'));
                functions.spinnerStop();
                return callback(true);
            }
        });
    },

    telnet_get_data: async (callback) => {

        await check_db(global_env.db.db_name);
        await change_working_db(global_env.db.db_name);
        await check_table(global_env.db.table_name);
        await insert_description(global_env.db.table_name, 'Start');

        await telnet.power_data(async (res) => {
            // console.log(res)

            var qinsertpwr = `INSERT INTO ${global_env.db.table_name} (timestamp, description, p1, p2, p3, p4, p5, p6, p7) VALUES (${Date.now()},' ', ${res[1]} , ${res[2]} , ${res[3]} , ${res[4]} , ${res[5]} , ${res[6]} , ${res[7]})`;
            // console.log(qinsertpwr);

            await sql.query(qinsertpwr, (err) => {
                if (err) {
                    console.log(chalk.red('Inserting into the table halted'));
                    return callback(false);
                } else {
                    // console.log(chalk.green("Inserted successfully : Power"));
                }
            });

        });
    },

    save_avg_data: async (tb_name, clm_name, start_timestamp, end_timestamp ,callback) => {
        await get_average(tb_name, clm_name, start_timestamp, end_timestamp);
    }
};

async function check_db(db_name) {
    //Checking databases
    await sql.query("CREATE DATABASE if not exists" + db_name, (err) => {
        if (err) {
            // console.log(chalk.blue(db_name + " : Error or database already exists. Continuing..."));
        } else {
            // console.log(chalk.green(db_name + " : Database created."));
        }
    });
}

async function change_working_db(db_name) {

    //Changing to current database
    await sql.query('use ' + db_name, (err) => {
        if (err) {
            console.log(chalk.red("Error while changing databases."));
            process.exit();
        } else {
            // console.log(chalk.green("Working Database changed to " + db_name));
        }
    });

}

async function check_table(tb_name) {

    //Check or create table
    var q = `CREATE TABLE if not exists ${tb_name} (timestamp BIGINT(255), description VARCHAR(255), p1 FLOAT(12), p2 FLOAT(12), p3 FLOAT(12), p4 FLOAT(12), p5 FLOAT(12), p6 FLOAT(12), p7 FLOAT(12))`;
    await sql.query(q, (err) => {
        if (err) {
            // console.log(chalk.blue(tb_name + 'Error or table already exists. Continuing...'));
        } else {
            // console.log(chalk.green(tb_name + " : Table created."));
        }
    });

}

async function insert_description(tb_name, description) {

    var qinsertpwr = `INSERT INTO ${tb_name} (timestamp, description) VALUES ( ${Date.now()} ,'${description}')`;
    // console.log(qinsertpwr);

    await sql.query(qinsertpwr, (err) => {
        if (err) {
            // console.log(chalk.red('INIT: Error inserting into the table'));
        } else {
            // console.log(chalk.green("INIT: Inserted successfully : Power"));
        }
    });

}

async function get_average(tb_name, clm_name, start_timestamp, end_timestamp) {
    await change_working_db(global_env.db.db_name);
    // https://stackoverflow.com/a/50174100
    var qavgpwr = `SELECT avg(${clm_name}) as avg from ${tb_name} where timestamp between ${start_timestamp} and ${end_timestamp}`;
    console.log(qavgpwr);

    await sql.query(qavgpwr, (err, rows, fields) => {
        if (err) {
            console.log(err);
            console.log(chalk.red('Avg fail'));
        } else {
            console.log(rows[0].avg);

            data_file.set(`${tb_name}.${clm_name}.timestamp`, {
                start: start_timestamp,
                end: end_timestamp,
                avg: rows[0].avg
            });

            console.log(chalk.green("Avg successfull"));
        }
    });

}