const assert = require('assert');

const readBufferized = (stream, bufferParser, bufferHandler) => new Promise((resolve, reject) => {
  let buffer = null;

  let nofBytes = 0;

  const indexList = [];

  let absolutePos = 0;

  stream.on('data', (chunk) => {
    buffer = buffer ? Buffer.concat([buffer, chunk]) : chunk;
    nofBytes += chunk.length;

    let usablePart = bufferParser(buffer);

    let pos = 0;
    while (usablePart && !usablePart.truncated) {
      if (bufferHandler) {
        bufferHandler(usablePart.buffer);
      }
      const start = absolutePos + usablePart.headerSize;
      const end = start + usablePart.buffer.length;
      indexList.push({
        start,
        end,
      });
      const shift = usablePart.headerSize + usablePart.buffer.length;
      pos += shift;
      absolutePos += shift;
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
    resolve({ indexList, nofBytes });
  });
  stream.on('error', reject);
});

module.exports = { readBufferized };
