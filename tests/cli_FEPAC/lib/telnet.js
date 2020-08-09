const functions = require('./methods');

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
        /* This following is to simulate 1 second delay to show the spinner */
        /* Callback info: https://stackoverflow.com/a/23340273 */
        await functions.delay(1000);

        await telcon.connect(params)
        .then(() => {
            console.log('Connection Successfull!');
            return callback(true);
        })
        .catch(function (error) {
            // console.log('Connection to Telnet server failed.');
            return callback(false);
        })
    }
};