/* eslint-disable no-console */

const fs = require('fs');
const helper = require('./read-bufferized');
const mch = require('./mch');
const mchbin = require('./mchbin-digits');
const dplsink = require('./dplsink-digits');

const readDigits = (filename, type) => {
  let ndigits = 0;

  const digitHandler = (digit) => {
    ndigits += 1;
    if (ndigits % 10000 === 0) {
      console.log('ndigits=', ndigits);
      console.log(digit);
    }
  };

  let bufferParser = null;
  if (type === 'mchbin') {
    bufferParser = mchbin;
  }

  if (type === 'dplsink') {
    bufferParser = dplsink;
  }

  if (!bufferParser) {
    throw new Error(`could not get buffer parser for type=${type}`);
  }
  const bufferHandler = (buffer) => {
    mch.readDigitBuffer(buffer, (digit) => digitHandler(digit));
  };

  const chunkSize = 64 * 1024;

  const stream = fs.createReadStream(filename, {
    highWaterMark: chunkSize,
  });

  helper.readBufferized(stream, bufferParser, bufferHandler).then((nbytes) => {
    console.log('total digits', ndigits);
    console.log('total bytes read', nbytes);
  });
};

module.exports = readDigits;
