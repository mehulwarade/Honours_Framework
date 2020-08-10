const inquirer = require('inquirer');
const functions = require('./methods');

var config_path = functions.getConfigPath(); /* Always put this after declaring functions */
global_env = require(config_path);

var prefix = '<== ---------------xx--------------- ==>'

module.exports = {
    ask_main: () => {
        return inquirer.prompt({
            type: 'rawlist',
            name: 'res',
            prefix: prefix,
            message: '\nWelcome to Framework for Evaluation of Parallel Algorithms on CLusters (FEPAC).\nPlease select your option: ',
            choices: ['MySQL', 'Telnet', 'Run FEPAC']
        });
    },

    ask_mysql: () => {

        msg = `\nWelcome to MySQL admin.\nPlease check the details and choose your options:\nDB host: ${global_env.db.host}\nDB user: ${global_env.db.user}\nDB name: ${global_env.db.db_name}\n`
        // Add support to check tables and work with them.
        return inquirer.prompt({
            type: 'rawlist',
            name: 'res',
            message: msg,
            prefix: prefix,
            choices: ['Test connection', 'Show password', '<- Go Back']
        });
    },

    ask_telnet: () => {
        msg = `\nWelcome to Telnet admin.\nPlease check the details and choose your options:\nTelnet IP: ${global_env.switch_telnet.IP}\nTelnet Port: ${global_env.switch_telnet.port}\nLogin: ${global_env.switch_telnet.login}\n`

        return inquirer.prompt({
            type: 'rawlist',
            name: 'res',
            message: msg,
            prefix: prefix,
            choices: ['Test connection', 'Show password', '<- Go Back']
        });
    }
};
