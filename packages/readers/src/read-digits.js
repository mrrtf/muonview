const fs = require('fs');
const mch = require('./mch');

/* read a chunk of the file, which is assumed to contain
 * a digit vector, and return a list of digits
 */

const readDigits = (filename, format, start, end) => new Promise((resolve, reject) => {
  const digits = [];
  let buffer = null;
  fs.createReadStream(filename, {
    start,
    end: end - 1,
  })
    .on('data', (chunk) => {
      buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;
      if (buffer.length === end - start) {
        mch.readDigitBuffer(buffer, (digit) => {
          digits.push(digit);
        });
      }
    })
    .on('end', () => {
      resolve(digits);
    })
    .on('error', (e) => {
      reject(e);
    });
});
module.exports = readDigits;
