const express = require('express');
const { getFile } = require('./store');
const readDigits = require('./read-digits');

const router = express.Router();

router.get('/', (req, res) => {
  const fileid = Number(req.query.fileid);
  getFile(fileid).then((file) => {
    if (!file) {
      res.send('<h2>not such file</h2>');
      return;
    }
    const indexid = Number(req.query.indexid);
    if (Number.isNaN(indexid) || indexid >= file.index.length) {
      res.send('<h2>not such index</h2>');
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
  });
});

module.exports = router;
