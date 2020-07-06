// import * as fs from 'fs';
import { program } from 'commander';
import axios from 'axios';
// import { actions, selectors } from '../../src/ducks/envelop';
// import { describeId } from '../../src/categories';
// import configureStore from '../../src/configureStore';

const digitAPI = 'http://localhost:3000/digits?';
const mappingAPI = 'http://localhost:8080/v2/';

// const store = configureStore();

program
  .option('--fileid <fileid>', 'file identifier ')
  .option('--indexid <indexid>', 'index id');

program.parse(process.argv);

const params = new URLSearchParams();
params.set('fileid', program.fileid);
params.set('indexid', program.indexid);

const completeDigits = (digits) => new Promise((resolve, reject) => {
  // generate the request for the mapping padlist api

  const padlist = digits.map((x) => ({ deid: x.deid, padid: x.padid }));
  const request = { padlist, keepOrder: true };
  axios
    .post(`${mappingAPI}padlist`, request)
    .then((response) => {
      resolve({ pads: response.data });
    })
    .catch((e) => reject(e));
});

axios
  .get(digitAPI + params.toString())
  .then((response) => {
    console.log(response.data);
    return completeDigits(response.data.digits);
  })
  .then((response) => console.log(JSON.stringify(response)))
  .catch((error) => console.log(error));

// store.subscribe(() => {
//   const state = store.getState().envelop;
//   if (!selectors.isLoading(state, id)) {
//     const json = JSON.stringify(state);
//     const filename = `${describeId(id).toLowerCase().replace(/ /g, '-')}.json`;
//     console.log(filename, json.length, state.isLoading.length);
//     if (state.isLoading.length === 0) {
//       console.log('write');
//       fs.writeFileSync(filename, json);
//     }
//   }
// });
// const fa = actions.fetch(id);
// if (Array.isArray(fa)) {
//   fa.map((a) => store.dispatch(a));
// } else {
//   store.dispatch(fa);
// }
