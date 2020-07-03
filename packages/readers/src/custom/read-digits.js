/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-console */
/* eslint-disable babel/no-unused-expressions */

const fs = require('fs');
const assert = require('assert');
const mch = require('../mch');

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

module.exports = readDigits;
