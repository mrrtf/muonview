const assert = require('assert');

const getDigit = (buffer) => ({
  digitTime: Number(buffer.readBigUInt64LE(0)),
  nofSamples: buffer.readUInt16LE(8),
  deid: buffer.readUInt32LE(12),
  padid: buffer.readUInt32LE(16),
  adc: Number(buffer.readBigUInt64LE(24)),
});

const DIGIT_SIZE = 32;

const readDigitBuffer = (buffer, digitHandler) => {
  assert.ok(
    buffer.length % DIGIT_SIZE === 0,
    `buffer length (${buffer.length}) should be a multiple of the digit size (${DIGIT_SIZE})`,
  );
  let pos = 0;
  let nofDigits = 0;
  while (pos < buffer.length) {
    const digit = getDigit(buffer.slice(pos));
    pos += DIGIT_SIZE;
    if (digitHandler) {
      digitHandler(digit);
    }
    nofDigits += 1;
  }
  return nofDigits;
};

module.exports = {
  DIGIT_SIZE,
  readDigitBuffer,
};
