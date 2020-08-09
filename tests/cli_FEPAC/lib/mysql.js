const functions = require('./methods');

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

sql = mysql.createConnection({
    host: global_env.db.host,
    user: global_env.db.user,
    password: global_env.db.password
});

module.exports = {
    db_connect: async (callback) => {
        /* This following is to simulate 1 second delay to show the spinner */
        /* return sql   <- Also works */
        /* Callback info: https://stackoverflow.com/a/23340273 */
        /*Callback for mysql:npm https://www.npmjs.com/package/mysql */
        await functions.delay(1000);

        await sql.connect(function (err) {
            if (err) {
                // console.log(chalk.red('Connection to Mysql server failed.'));
                return callback(false);
            }
            else {
                // console.log(chalk.green('Connection Successfull!'));
                return callback(true);
            }
        });
    }
};

