const fs = require('fs');
const path = require('path');

// https://www.npmjs.com/package/clui
const CLI = require('clui');
const Spinner = CLI.Spinner;

const spin = new Spinner();

var config_path = getConfigPatha(); /* Always put this after declaring functions */
global_env = require(config_path);

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },


  delay: (time) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), time)
    })
  }

};
