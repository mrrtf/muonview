const express = require('express');
const { getFileByHash } = require('./store');

const router = express.Router();

const send = (res, file) => {
  res.json({
    filename: file.filename,
    format: file.format,
    index: file.index,
    elemsize: file.kind === 'digits' ? 32 : null,
    sha256: file.sha256,
  });
};

router.get('/', (req, res) => {
  getFileByHash(req.query.hash)
    .then((file) => {
      send(res, file);
    })
    .catch((e) => {
      res.send(`<h2>no such file: ${e}</h2>`);
    });
});

module.exports = router;
