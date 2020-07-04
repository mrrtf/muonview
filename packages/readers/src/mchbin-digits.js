const bufferParser = (buffer) => {
  const ndigits = buffer.readUInt32LE(0);
  const headerSize = 4;
  const size = ndigits * 32 + headerSize;
  return {
    buffer: size ? buffer.slice(headerSize, size) : buffer,
    truncated: size >= buffer.length || size === 0,
    size,
  };
};

module.exports = bufferParser;
