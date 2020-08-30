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
    var datajson = require(process.cwd() + '/logs/data.json');

    // console.log(datajson.cl_480_2_node_full.p1.timestamp);
    // // https://stackoverflow.com/a/54222450
    // console.log(datajson[global_env.db.table_name].p1.timestamp);
}
else {
    console.log(chalk.red('Configuration file does not exists at ' + config_path));
    process.exit();
}

const run = async () => {
    try {
        
        const ask_main = await inquirer.ask_main();

        if (ask_main.res == 'Test MySQL connection') {
                mysql.db_connect((res) => {
                    run();
                });
        }
        else if (ask_main.res == 'Test Telnet connection') {
                telnet.telnet_connect((res) => {
                    run();
                });
        }
        else if (ask_main.res == 'Run FEPAC') {
            fepac();
        }
        else if(ask_main.res == 'Exit'){
            console.log(chalk.green('Thank you for using FEPAC'))
            process.exit();
        }
        // console.log(chalk.green('All done!'));
    }

    catch (err) {
        console.log('errrorrrroro');
        console.log(chalk.red(err));
    }
};


const fepac = async () => {

    const ask_fepac = await inquirer.ask_fepac();
            
    if (ask_fepac.res == 'MySQL <-> Telnet connection (Power)') {
        await mysql.telnet_get_data((res) => {
            fepac()
        });
        console.log(chalk.blue('Power data is being inserted into mysql database in background.'))
        fepac()
    }
    else if (ask_fepac.res == 'Stop mysql insert') {
        await telnet.stop_telnet();
    }
    else if (ask_fepac.res == 'Get avg') {
        await mysql.save_avg_data('cl_480_2_node_full','p1',1597202902173, 1597202912173);
    }
    else if (ask_fepac.res == 'Run algorithm') {
        algo_run();
        
    }
    else if (ask_fepac.res == 'Go Back') {
        run();
    }
    else if(ask_fepac.res == 'Exit'){
        console.log(chalk.green('Thank you for using FEPAC'))
        process.exit();
    }
    


};

const algo_run = async () => {
    const ask_run_algo = await inquirer.ask_run_algo();

    if (ask_run_algo.res == 'Go Back') {
        fepac();
    }
    else if(ask_run_algo.res == 'Exit'){
        console.log(chalk.green('Thank you for using FEPAC'))
        process.exit();
    }
    else{
        //Checking for the algorithm details.
        await functions.spinnerStart('Checking pre-requisites for ' + ask_run_algo.res);
        await functions.delay(1000);
        if(functions.directoryExists(global_env.algorithm[ask_run_algo.res].file_path) && functions.directoryExists(global_env.algorithm.hostfile_folder)){
            console.log(chalk.green('\nAlgorithm and hostfiles exists'))
            await functions.spinnerStop();
            algo_run();
        }
        else{
            console.log(chalk.red('\nAlgorithm or the hostfiles not found. Check configuration file'))
            await functions.spinnerStop();
            algo_run();
        }
        // https://stackoverflow.com/a/54222450
        // console.log(ask_run_algo.res);
        // console.log(global_env.algorithm[ask_run_algo.res]);
    }

}


run();
