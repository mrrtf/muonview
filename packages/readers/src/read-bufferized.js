const assert = require('assert');

const readBufferized = (stream, bufferParser, bufferHandler) => new Promise((resolve, reject) => {
  let buffer = null;

  let nbytes = 0;

  stream.on('data', (chunk) => {
    nbytes += chunk.length;
    buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;

    let usablePart = bufferParser(buffer);

    let pos = 0;
    while (usablePart && !usablePart.truncated) {
      bufferHandler(usablePart.buffer);
      pos += usablePart.size;
      usablePart = bufferParser(buffer.slice(pos));
    }

    if (pos === 0) {
      return;
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
    resolve(nbytes);
  });
  stream.on('error', reject);
});

module.exports = { readBufferized };
