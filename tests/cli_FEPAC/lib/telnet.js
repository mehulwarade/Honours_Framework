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
                return callback(true);
            })
            .catch(function (error) {
                console.log(chalk.red('Connection to Telnet server failed.'));
                functions.spinnerStop();
                process.exit();
            })
    }
};