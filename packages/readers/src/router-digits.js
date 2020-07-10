const express = require('express');
const { getFileByHash } = require('./store');
const readDigits = require('./read-digits');

const router = express.Router();

const readFromFile = (file, indexid, res) => {
  if (Number.isNaN(indexid) || indexid >= file.index.length) {
    res.send('<h2>no such index</h2>');
    return;
  }
  const ix = file.index[indexid];

  readDigits(file.filename, file.format, ix.start, ix.end).then((digits) => {
    res.json({
      ix,
      ndigits: digits.length,
      digits,
    });
  });
};

const getByFileHash = (hash, indexid, res) => {
  getFileByHash(hash)
    .then((file) => {
      readFromFile(file, indexid, res);
    })
    .catch(() => {
      res.send('<h2>no such file</h2>');
    });
};

router.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const indexid = Number(req.query.indexid);
  getByFileHash(req.query.hash, indexid, res);
});

module.exports = router;
