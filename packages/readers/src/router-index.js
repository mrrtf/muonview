const express = require('express');
const { getFile } = require('./store');

const router = express.Router();

const send = (res, file) => {
  res.json({
    filename: file.filename,
    format: file.format,
    index: file.index,
    elemsize: file.kind === 'digits' ? 32 : null,
  });
};

router.get('/', (req, res) => {
  const fileid = Number(req.query.fileid);
  getFile(fileid).then((file) => {
    if (!file) {
      res.send('<h2>not such file</h2>');
      return;
    }
    send(res, file);
  });
});

module.exports = router;
