const express = require('express');
const indexFile = require('./index-file');

const router = express.Router();

const defaultFilename = '/Users/laurent/cernbox/o2muon/dpl-digits.bin';
const defaultType = 'dplsink';

router.get('/', (req, res) => {
  const filename = req.query.file || defaultFilename;
  const type = req.query.type || defaultType;
  indexFile(filename, type).then((result) => {
    res.json({
      filename,
      type,
      indices: result.indexList,
    });
  });
});

module.exports = router;
