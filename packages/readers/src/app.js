const express = require('express');

const app = express();
const digitRouter = require('./router-digits');
/*
 * the app should :
 * - index file(s) on startup
 * - serve the index list of (any) file on /index route
 * - serve digits on /digits route
 *
 * could we btw imagine also provide the ability to drag and drop a file
 * into mchview and have it display it ? That should be doable by
 * using the indexFile functions ?
 *
 */

app.use('/digits', digitRouter);

const defaultFilename = '/Users/laurent/cernbox/o2muon/dpl-digits.bin';
const defaultType = 'dplsink';

app.get('/filelist', (req, res) => {
  const files = [];
  files.push({
    filename: defaultFilename,
    format: defaultType,
    kind: 'digits',
  });
  res.json({
    availableFiles: files,
  });
});

module.exports = app;
