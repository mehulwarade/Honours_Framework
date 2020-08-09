const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const functions = require('./lib/methods');
const inquirer = require('./lib/inquirer');
const mysql = require('./lib/mysql');
const telnet = require('./lib/telnet');

var config_path = functions.getConfigPath(); /* Always put this after declaring functions */

clear();

console.log(
    chalk.yellow(
        figlet.textSync('FEPAC', { horizontalLayout: 'full' })
    )
);

/* Checking for configuration file */

if (functions.directoryExists(config_path)) {
    // console.log(chalk.green('Configuration file found.'));
    var global_env = require(config_path);
}
else {
    console.log(chalk.red('Configuration file does not exists at ' + config_path));
    process.exit();
}

const run = async () => {
    try {
        const ask_main = await inquirer.ask_main();

        if (ask_main.res == 'MySQL') {
            const ask_mysql = await inquirer.ask_mysql();

            if (ask_mysql.res == 'Test connection') {

                await functions.spinnerStart('Testing connection to mysql server...');

                mysql.db_connect((res) => {
                    if (res) {
                        console.log(chalk.green('Connection Successfull!'));
                        functions.spinnerStop();
                        run();
                    }
                    else {
                        console.log(chalk.red('Connection to Mysql server failed.'));
                        functions.spinnerStop();
                        process.exit();
                    }
                });
            }
            else if (ask_mysql.res == 'Show password') {
                console.log(chalk.red('Insecure: ') + chalk.green('Password for mysql server is: ' + global_env.db.password));
                run();
            }
            else {
                run();
            }

        }
        else if (ask_main.res == 'Telnet') {
            const ask_telnet = await inquirer.ask_telnet();

            if (ask_telnet.res == 'Test connection') {

                await functions.spinnerStart('Testing connection to telnet server...');

                telnet.telnet_connect((res) => {
                    if (res) {
                        console.log(chalk.green('Connection Successfull!'));
                        functions.spinnerStop();
                        run();
                    }
                    else {
                        console.log(chalk.red('Connection to Telnet server failed.'));
                        functions.spinnerStop();
                        process.exit();
                    }
                });
            }
            else if (ask_telnet.res == 'Show password') {
                console.log(chalk.red('Insecure: ') + chalk.green('Password for mysql server is: ' + global_env.switch_telnet.password));
                run();
            }
            else {
                run();
            }
        }
        else {
            console.log('error');
        }
        // console.log(chalk.green('All done!'));
    }

    catch (err) {
        console.log('errrorrrroro');
        console.log(chalk.red(err));
    }
};

run();
