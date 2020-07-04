const assert = require('assert');

const readBufferized = (stream, bufferParser, bufferHandler) => new Promise((resolve, reject) => {
  let buffer = null;

  let nofBytes = 0;

  let nofCompleteBuffers = 0;

  stream.on('data', (chunk) => {
    nofBytes += chunk.length;
    buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;

    let usablePart = bufferParser(buffer);

    let pos = 0;
    while (usablePart && !usablePart.truncated) {
      nofCompleteBuffers += 1;
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
      nofBytes -= remaining;
      stream.unshift(r);
    }
  });
  stream.on('end', () => {
    resolve({ nofBytes, nofCompleteBuffers });
  });
  stream.on('error', reject);
});

module.exports = { readBufferized };
