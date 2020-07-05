/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const digitRouter = require('./router-digits');
//
// const app = express();
// const port = 3000;
//
// app.use('/digits', digitRouter);
//
// const defaultFilename = '/Users/laurent/cernbox/o2muon/dpl-digits.bin';
// const defaultType = 'dplsink';
//
// app.get('/filelist', (req, res) => {
//   const files = [];
//   files.push({
//     filename: defaultFilename,
//     format: defaultType,
//     kind: 'digits',
//   });
//   res.json({
//     availableFiles: files,
//   });
// });
//
// app.listen(port, () => process.stdout.write(`starting example app at http://localhost:${port}`));
// if (module.hot) {
//   module.hot.accept('./router-digits');
// }
