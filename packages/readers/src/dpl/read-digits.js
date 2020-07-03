/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-console */
/* eslint-disable babel/no-unused-expressions */

const fs = require('fs');
const assert = require('assert');
const aliceo2 = require('./aliceo2');
const mch = require('../mch');
// const bufutil = require('../bufutil');

// given a buffer, get the index of the first byte of the payload
// and the size of that payload

const readBufferized = (stream, bufferHandler) => new Promise((resolve, reject) => {
  let buffer = null;

  let nchunks = 0;

  let nbytes = 0;

  stream.on('data', (chunk) => {
    nchunks += 1;
    nbytes += chunk.length;
    if (buffer !== null) {
      buffer = Buffer.concat([buffer, chunk]);
    } else {
      buffer = chunk;
    }

    let usablePart = bufferHandler.getSlice(buffer);
    if (!usablePart || usablePart.truncated) {
      return;
    }

    let pos = 0;
    while (usablePart && !usablePart.truncated) {
      bufferHandler.use(usablePart.buffer);
      pos += usablePart.size;
      usablePart = bufferHandler.getSlice(buffer.slice(pos));
    }

    const remaining = buffer.length - pos;
    assert(remaining >= 0, `remaining should be >=0 but is ${remaining}`);
    if (remaining > 0) {
      const r = Buffer.from(buffer.slice(pos));
      assert(r.length === remaining);
      buffer = null;
      nbytes -= remaining;
      stream.unshift(r);
    }
  });
  stream.on('end', () => {
    console.log('read nbytes=', nbytes);
    resolve();
  });
  stream.on('error', reject);
});

const digitBufferHandler = {
  ndigits: 0,
  nstart: 0,
  nused: 0,
  digitHandler(digit) {
    this.ndigits += 1;
    if (this.ndigits % 10000 === 0) {
      console.log('ndigits=', this.ndigits);
      console.log(digit);
    }
  },
  getSlice(buffer) {
    const headerStack = aliceo2.getHeaderStack(buffer);
    const headerSize = aliceo2.headerSize(headerStack);
    const size = aliceo2.size(headerStack);
    return {
      buffer: size ? buffer.slice(headerSize, size) : buffer,
      truncated: size >= buffer.length || size === 0,
      size,
    };
  },
  use(buffer) {
    this.nused += 1;
    mch.readDigitBuffer(buffer, (digit) => this.digitHandler(digit));
  },
};

const readDigits = (filename) => {
  const chunkSize = 64 * 1024;

  const stream = fs.createReadStream(filename, {
    highWaterMark: chunkSize,
  });

  readBufferized(stream, digitBufferHandler).then(() => {
    console.log('total digits', digitBufferHandler.ndigits);
  });
};

module.exports = readDigits;
