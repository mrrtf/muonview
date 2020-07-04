const removeZero = (str) => str.replace(/\0/g, '');

const getBaseHeader = (buffer) => {
  if (buffer.length < 32) {
    return null;
  }
  return {
    magicString: removeZero(buffer.slice(0, 4).toString('utf8')),
    headerSize: buffer.readUInt32LE(4),
    hasNextHeader: buffer.readUInt32LE(8) === 1,
    headerVersion: buffer.readUInt32LE(12),
    description: removeZero(buffer.slice(16, 24).toString('utf8')),
    serialization: removeZero(buffer.slice(24, 32).toString('utf8')),
  };
};

const getDataHeader = (buffer) => {
  if (buffer.length < 54) {
    return null;
  }
  return {
    dataDescription: removeZero(buffer.slice(0, 16).toString('utf8')),
    dataOrigin: removeZero(buffer.slice(16, 20).toString('utf8')),
    splitPayloadParts: buffer.readUInt32LE(10),
    payloadSerializationMethod: removeZero(
      buffer.slice(24, 32).toString('utf8'),
    ),
    subSpecification: buffer.readUInt32LE(32),
    spitPayloadIndex: buffer.readUInt32LE(36),
    payloadSize: buffer.readBigUInt64LE(40),
    firstTForbit: buffer.readUInt32LE(48),
  };
};

const getFlowHeader = (buffer) => {
  if (buffer < 24) {
    return null;
  }
  return {
    startTime: buffer.readBigUInt64LE(0),
    duration: buffer.readBigUInt64LE(8),
    creation: buffer.readBigUInt64LE(16),
  };
};

const isHeader = (buffer) => buffer.slice(0, 4).toString('utf8') === 'O2O2';

const getHeader = (buffer) => {
  if (!isHeader(buffer)) {
    return null;
  }
  const baseHeaderSize = 32; // bytes
  const baseHeader = getBaseHeader(buffer);
  if (!baseHeader) {
    return null;
  }
  let extraHeader = {};
  switch (baseHeader.description) {
    case 'DataHead':
      extraHeader = getDataHeader(buffer.slice(baseHeaderSize));
      break;
    case 'DataFlow':
      extraHeader = getFlowHeader(buffer.slice(baseHeaderSize));
      break;
    default:
      throw new Error(
        `do not know how to deal with header of type ${baseHeader.description}`,
      );
  }

  return { ...baseHeader, ...extraHeader };
};

// FIXME: should work with any number of headers, not just two
const getHeaderStack = (buffer) => {
  let pos = 0;
  const h = getHeader(buffer.slice(pos));
  if (h === null) {
    return null;
  }
  pos += h.headerSize;
  const h2 = getHeader(buffer.slice(pos));
  if (!h2) {
    return null;
  }
  pos += h2.headerSize;
  const h3 = getHeader(buffer.slice(pos));
  if (h3 !== null) {
    return null;
  }
  return [h, h2];
};

const headerSize = (stack) => (stack ? stack.reduce((size, header) => size + header.headerSize, 0) : 0);
const payloadSize = (stack) => (stack ? Number(stack[0].payloadSize) : 0);
const size = (stack) => headerSize(stack) + payloadSize(stack);

module.exports = {
  getHeaderStack,
  headerSize,
  payloadSize,
  size,
};
