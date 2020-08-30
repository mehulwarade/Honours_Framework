const chalk = require('chalk');

const functions = require('./methods');
const inquirer = require('./inquirer');
const mysql = require('./mysql');
const telnet = require('./telnet');

const { spawnSync } = require('child_process');

var config_path = functions.getConfigPath(); /* Always put this after declaring functions */
global_env = require(config_path);

module.exports = {

    check: async (algorithm_name) => {

        //Checking for the algorithm details.
        await functions.spinnerStart('Checking pre-requisites for ' + algorithm_name);
        await functions.delay(1000);
        if(functions.directoryExists(global_env.algorithm[algorithm_name].file_path) && functions.directoryExists(global_env.algorithm.hostfile_folder)){
            console.log(chalk.green('\nAlgorithm and hostfiles exists'))
            await functions.spinnerStop();

            // const confirm = await inquirer.confirm_run_algo();
            if((await inquirer.confirm_run_algo(algorithm_name)).res){
                await final_run_algo(algorithm_name);
                return true;
            }
            else{
                console.log(chalk.red('\nAlgorithm execution not authorised.'))
                return false; 
            }
        }
        else{
            console.log(chalk.red('\nAlgorithm or the hostfiles not found. Check configuration file'))
            await functions.spinnerStop();
            return false;
        }
        // https://stackoverflow.com/a/54222450
        // console.log(ask_run_algo.res);
        // console.log(global_env.algorithm[ask_run_algo.res]);
    }

};

async function final_run_algo(algorithm_name) {
    await mysql.db_connect((res) => {});

    await telnet.telnet_connect((res) => {});

    await functions.spinnerStart('Running ' + algorithm_name);
    await functions.delay(500)
    var folder='~/Honours_Framework/algorithms/python_opencv'
    var mpirun='mpirun -N 4 -hostfile ../hostfile/hostfile5 python3 opencv.py'
    const ls = spawnSync('ssh', [global_env.app.master_node_ip, `cd ${folder} && ${mpirun}`]);

    if(ls.stdout){
      console.log(ls.stdout.toString());
    }

    await functions.spinnerStop();
}