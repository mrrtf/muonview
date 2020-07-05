/* eslint-disable no-console */

const fs = require('fs');
const crypto = require('crypto');
const { indexFile } = require('./read-utils');

let store = null;

const createHashFromFile = (filePath, id) => {
  const hash = crypto.createHash('sha1');
  let r = null;
  const fd = fs.createReadStream(filePath).on('end', () => {
    hash.end();
    r = hash.digest('hex');
    const file = store.files.find((x) => x.id === id);
    file.sha256 = r;
  });
  fd.pipe(hash);
  return r;
};

const createFile = (id, filename, format, kind) => {
  const sha = createHashFromFile(filename, id);
  return {
    id,
    filename,
    format,
    kind,
    index: null,
    sha256: sha,
  };
};

const createDefaultStore = () => {
  console.log('createDefaultStore');
  const files = [];

  files.push(
    createFile(
      1,
      '/Users/laurent/cernbox/o2muon/dpl-digits.bin',
      'dplsink',
      'digits',
    ),
  );
  files.push(
    createFile(
      2,
      '/Users/laurent/cernbox/o2muon/digits.v2.in',
      'mchbin',
      'digits',
    ),
  );

  return { files };
};

store = createDefaultStore();

const getFile = (id) => new Promise((resolve, reject) => {
  const file = store.files.find((x) => x.id === id);
  if (!file) {
    return reject(new Error(`File ${file.id}does not exist`));
  }
  if (file.index) {
    console.log('file ', file.filename, 'already indexed. Returning it');
    return resolve(file);
  }
  console.log('indexing file ', file.filename);
  return indexFile(file.filename, file.format)
    .then((result) => {
      file.index = result.indexList;
      return resolve(file);
    })
    .catch((error) => reject(error));
});

module.exports = {
  store,
  getFile,
};
