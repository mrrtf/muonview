/* eslint-disable no-console */

const program = require('commander');
const Listr = require('listr');
const indexFile = require('./index-file');
const mch = require('./mch');

let ndigits = 0;

const digitHandler = (digit) => {
  ndigits += 1;
  if (ndigits % 100000 === 0) {
    console.log('ndigits=', ndigits);
    console.log(digit);
  }
};

const bufferHandler = (buffer) => {
  mch.readDigitBuffer(buffer, (digit) => digitHandler(digit));
};

const indexDigitFile = (digitfile, options) => {
  const type = options.dpl ? 'dplsink' : 'mchbin';
  return indexFile(digitfile, type, options.indexOnly ? null : bufferHandler);
};

const cli = (args) => {
  const tasks = [];

  program
    .command('digits <digitfile>')
    .description('read or index digit file')
    .option('-d, --dpl', 'dpl input')
    .option('-i, --indexOnly', 'index only')
    .action((digitfile, options) => {
      tasks.push({
        title: 'index file',
        task: (ctx) => new Promise((resolve, reject) => {
          indexDigitFile(digitfile, options)
            .then((v) => {
              ctx[digitfile] = v;
              resolve();
            })
            .catch((e) => reject(e));
        }),
      });
    });
  program.parse(args);

  new Listr(tasks).run().then((ctx) => {
    Object.keys(ctx).forEach((k) => {
      console.log(
        `File ${k} is ${ctx[k].nofBytes} bytes long and we generated ${ctx[k].indexList.length} indices for it`,
      );
    });
  });
};

module.exports = cli;
