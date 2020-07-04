const o2message = require('./o2message');

/* given a buffer, get the index of the first byte of the payload
 * and the size of that payload
 */
const bufferParser = (buffer) => {
  const headerStack = o2message.getHeaderStack(buffer);
  const headerSize = o2message.headerSize(headerStack);
  const size = o2message.size(headerStack);
  return {
    buffer: size ? buffer.slice(headerSize, size) : buffer,
    truncated: size >= buffer.length || size === 0,
    headerSize,
  };
};

module.exports = bufferParser;
