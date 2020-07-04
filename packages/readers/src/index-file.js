/* eslint-disable no-console */

const fs = require('fs');
const helper = require('./read-bufferized');
const createBufferParser = require('./buffer-parser');

// const indexFile = (filename, type, bufferHandler) => new Promise((resolve, reject) => {
//   const bufferParser = createBufferParser(type);
//
//   const chunkSize = 64 * 1024;
//
//   const stream = fs.createReadStream(filename, {
//     highWaterMark: chunkSize,
//   });
//
//   helper
//     .readBufferized(stream, bufferParser, bufferHandler)
//     .then((result) => {
//       // console.log('total bytes read', result.nofBytes);
//       // console.log('total messages', result.indexList.length);
//       resolve(result.indexList);
//     })
//     .catch((error) => reject(error));
// });

const indexFile = (filename, type, bufferHandler) => {
  const bufferParser = createBufferParser(type);

  const chunkSize = 64 * 1024;

  const stream = fs.createReadStream(filename, {
    highWaterMark: chunkSize,
  });

  return helper.readBufferized(stream, bufferParser, bufferHandler);
};

module.exports = indexFile;
