/* eslint-disable no-console */

const program = require('commander');
const custom = require('./custom/read-digits');
const dpl = require('./dpl/read-digits');

const cli = (args) => {
  program
    .command('digits <digitfile>')
    .description('read digit file')
    .option('-d, --dpl', 'dpl input')
    .action((digitfile, options) => {
      console.log(digitfile, options.dpl);
      if (options.dpl) {
        dpl(digitfile);
      } else {
        custom(digitfile);
      }
    });
  program.parse(args);
};

module.exports = cli;
