/* eslint-disable no-console */

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ');
}

function bufferToAscii(buffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => String.fromCharCode(b))
    .join('');
}

const dump = (chunk, nbytes = 192) => {
  for (let i = 0; i < nbytes; i += 8) {
    const c = chunk.slice(i, i + 8);
    console.log(bufferToHex(c), bufferToAscii(c));
    i += 8;
  }
};

module.exports = { dump };
