const functions = require('./methods');
const chalk = require('chalk');

var config_path = functions.getConfigPath(); /* Always put this after declaring functions */
global_env = require(config_path);


//Telnet initialisation
var Telnet = require('telnet-client');

var telcon = new Telnet();

var params = {
    host: global_env.switch_telnet.IP,
    port: global_env.switch_telnet.port,
    shellPrompt: '/:~[^$]*\$\s*$/',
    timeout: global_env.switch_telnet.interval_to_call,
    shellPrompt: '.',
}

var pwr = [];
var timerId;
module.exports = {
    telnet_connect: async (callback) => {

        await functions.spinnerStart('Testing connection to telnet server...');

        /* This following is to simulate 1 second delay to show the spinner */
        /* Callback info: https://stackoverflow.com/a/23340273 */
        await functions.delay(1000);

        await telcon.connect(params)
            .then(() => {
                console.log(chalk.green('Connection Successfull!'));
                functions.spinnerStop();
                telcon.end()
                return callback(true);
            })
            .catch(async (error) => {
                console.log(chalk.red('Connection to Telnet server failed.'));
                functions.spinnerStop();
                console.log(chalk.red('Stop all services and try again. The program will end.'));
                await functions.delay(500);
                process.exit();
            })
    },

    power_data: async (callback) => {

        await telcon.connect(params)
            .then(() => {
                // console.log(chalk.green('telnet connect enter'));
                //Following functionality only works for NETGEAR ProSAFE GS110TP switches.
                telcon.send(global_env.switch_telnet.login)
                telcon.send(global_env.switch_telnet.password)
                telcon.send('enable')
                telcon.send('\n')

                timerId = setInterval(() => {
                    telcon.send('show poe port info all')
                        .then(function (res) {
                            pwr[0] = "dynamic power usage (Index = port number)"
                            pwr[1] = parseFloat(res.slice(1163, 1223).slice(15, 18))
                            pwr[2] = parseFloat(res.slice(1224, 1284).slice(15, 18))
                            pwr[3] = parseFloat(res.slice(1285, 1345).slice(15, 18))
                            pwr[4] = parseFloat(res.slice(1346, 1406).slice(15, 18))
                            pwr[5] = parseFloat(res.slice(1407, 1467).slice(15, 18))
                            pwr[6] = parseFloat(res.slice(1468, 1528).slice(15, 18))
                            pwr[7] = parseFloat(res.slice(1529, 1589).slice(15, 18))
                            // console.log(pwr);   
                            // console.log('Updating data...')
                            return callback(pwr);
                        })
                }, parseInt(global_env.switch_telnet.interval_to_call));

            })
            .catch(function (error) {
                console.log(chalk.red('Connection to Telnet server failed while quering for values.'));
                process.exit();
            })
    },

    stop_telnet: () => {
        //if timerID is null then don't do anything
        clearInterval(timerId);
    }
};