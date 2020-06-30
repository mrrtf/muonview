/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-console */
/* eslint-disable babel/no-unused-expressions */

const fs = require('fs');
const assert = require('assert');
const program = require('commander');
const aliceo2 = require('./aliceo2');
const mch = require('./mch');

const getDigitVectorSize = (chunk) => {
  if (!chunk) return 0;
  const ndigits = chunk.readUInt32LE(0);
  return [ndigits * mch.DIGIT_SIZE, ndigits];
};

const defaultDigitHandler = (digit) => {
  console.log(digit);
};

const digitVectorFitInBuffer = (buffer) => {
  if (!buffer) return false;
  const vectorSize = getDigitVectorSize(buffer)[0];
  if (vectorSize <= 0) return false;
  return vectorSize <= buffer.length;
};

const decodeDigitBuffer = (buffer, digitHandler) => {
  let pos = 0;
  for (;;) {
    if (pos >= buffer.length) {
      break;
    }
    const vectorSize = getDigitVectorSize(buffer.slice(pos))[0];
    if (pos + vectorSize > buffer.length) {
      break;
    }
    pos += 4;
    mch.readDigitBuffer(buffer.slice(pos, pos + vectorSize), digitHandler);
    pos += vectorSize;
  }
  return pos;
};

const onData = (stream, chunk, digitBuffer, digitHandler) => {
  if (digitBuffer.buffer) {
    digitBuffer.buffer = Buffer.concat([digitBuffer.buffer, chunk]);
  } else {
    digitBuffer.buffer = chunk;
  }

  if (digitVectorFitInBuffer(digitBuffer.buffer)) {
    const bytesUsed = decodeDigitBuffer(digitBuffer.buffer, digitHandler);
    const remaining = digitBuffer.buffer.length - bytesUsed;
    assert(remaining >= 0, `remaining should be >=0 but is ${remaining}`);
    if (remaining > 0) {
      const r = Buffer.from(digitBuffer.buffer.slice(bytesUsed));
      assert(r.length === remaining);
      digitBuffer.buffer = null;
      stream.unshift(r);
    }
  }
};

const readBinaryDigits = (filename, digitHandler = defaultDigitHandler) => new Promise((resolve, reject) => {
  const stream = fs.createReadStream(filename, {
    highWaterMark: 64 * 1024,
  });

  const digitBuffer = { buffer: null };

  stream.on('data', (chunk) => onData(stream, chunk, digitBuffer, digitHandler));
  stream.on('end', resolve);
  stream.on('error', reject);
});

const readDPLDigits = (filename) => {
  const readOptions = {
    highWaterMark: 640 * 1024,
  };
  const readable = fs.createReadStream(filename, readOptions);

  const maxsize = 0;
  let bytesRead = 0;
  readable.on('data', (chunk) => {
    let posInChunk = 0;
    bytesRead += chunk.length;
    const h = aliceo2.getHeader(chunk.slice(posInChunk));
    posInChunk += h.headerSize;
    console.log('h=', h);
    const h2 = aliceo2.getHeader(chunk.slice(posInChunk));
    console.log('h2=', h2);
    posInChunk += h2.headerSize;
    console.log('posInChunk=', posInChunk);
    const h3 = aliceo2.getHeader(chunk.slice(posInChunk));
    if (h3 !== null) {
      throw new Error('got unexpected header');
    }
    console.log('h3=', h3);
    // here should limit the chunk slice to the size of the o2 message
    mch.readDigitBuffer(chunk.slice(posInChunk), (digit) => {
      console.log(digit);
    });
    if (bytesRead > maxsize) {
      process.exit(1);
    }
  });

  readable.on('end', () => {
    console.log('this is the end my friend');
  });
};

const readDigits = (filename) => {
  let ndigits = 0;

  readBinaryDigits(filename, () => {
    ndigits += 1;
    if (ndigits % 10000 === 0) {
      console.log('ndigits=', ndigits);
    }
  }).then(() => {
    console.log('total digits', ndigits);
  });
};

const cli = (args) => {
  program
    .command('digits <digitfile>')
    .description('read digit file')
    .option('-d, --dpl', 'dpl input')
    .action((digitfile, options) => {
      console.log(digitfile, options.dpl);
      if (options.dpl) {
        readDPLDigits(digitfile);
      } else {
        readDigits(digitfile);
      }
    });
  program.parse(args);
};

module.exports = cli;
