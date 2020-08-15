const fs = require('fs');
const path = require('path');

// https://www.npmjs.com/package/clui
const CLI = require('clui');
const Spinner = CLI.Spinner;

const spin = new Spinner();

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  getConfigPath: () => {
    return process.cwd() + '/configuration.json';
  },

  getDataFilePath: () => {
    return process.cwd() + '/logs/data.json';
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  spinnerStart: (msg) => {
    spin.message(msg);
    spin.start();
  },

  spinnerStop: () => {
    spin.stop();
  },

  delay: (time) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), time)
  })
  }

};
