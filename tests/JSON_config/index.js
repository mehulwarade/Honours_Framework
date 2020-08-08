//http://zetcode.com/javascript/nodeconfig/

const config = require('config');

let appPort = config.get('app.port');
console.log(`Application port: ${appPort}`);

let dbHost = config.get('db.host');
console.log(`Database host: ${dbHost}`);

let dbPort = config.get('db.port');
console.log(`Database port: ${dbPort}`);

let dbName = config.get('db.name');
console.log(`Database name: ${dbName}`);

console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));