/* eslint-disable no-console */

const program = require('commander');
const readDigits = require('./read-digits');

const cli = (args) => {
  program
    .command('digits <digitfile>')
    .description('read digit file')
    .option('-d, --dpl', 'dpl input')
    .action((digitfile, options) => {
      console.log(digitfile, options.dpl);
      readDigits(digitfile, options.dpl ? 'dplsink' : 'mchbin');
    });
  program.parse(args);
};

module.exports = cli;
