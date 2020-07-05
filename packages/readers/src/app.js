const express = require('express');

const app = express();
const omit = require('lodash/omit');
const digitRouter = require('./router-digits');
const indexRouter = require('./router-index');
const { store } = require('./store');
/*
 * the app should :
 * [X] index file(s) on startup
 * [X] serve the index list of (any) file on /index route
 * [X] serve digits on /digits route
 * [ ] serve clusters on /clusters route
 *
 * could we btw imagine also provide the ability to drag and drop a file
 * into mchview and have it display it ? That should be doable by
 * using the indexFile functions ?
 *
 */

// console.log('initial store=', store);

app.use('/digits', digitRouter);
app.use('/index', indexRouter);

app.get('/filelist', (req, res) => {
  res.json({
    availableFiles: store.files.map((x) => ({
      ...omit(x, 'index'),
      indexSize: x.index ? x.index.length : 0,
    })),
  });
});

module.exports = app;
