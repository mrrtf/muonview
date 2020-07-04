const mchbin = require('./mchbin-digits');
const dplsink = require('./dplsink-digits');

const createBufferParser = (type) => {
  if (type === 'mchbin') {
    return mchbin;
  }

  if (type === 'dplsink') {
    return dplsink;
  }

  throw new Error(`could not get buffer parser for type=${type}`);
};

module.exports = createBufferParser;
