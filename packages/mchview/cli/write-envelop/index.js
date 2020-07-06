import * as fs from 'fs';
import { program } from 'commander';
import { actions, selectors } from '../../src/ducks/envelop';
import { describeId } from '../../src/categories';
import configureStore from '../../src/configureStore';

const store = configureStore();

program
  .option('--deid <deid>', 'detection element id')
  .option('--dsid <dsid>', 'dual sampa id');

program.parse(process.argv);

let id = { deid: program.deid };

if (program.dsid) {
  id = { ...id, dsid: program.dsid === 'null' ? null : program.dsid };
}

store.subscribe(() => {
  const state = store.getState().envelop;
  if (!selectors.isLoading(state, id)) {
    const json = JSON.stringify(state);
    const filename = `${describeId(id).toLowerCase().replace(/ /g, '-')}.json`;
    console.log(filename, json.length, state.isLoading.length);
    if (state.isLoading.length === 0) {
      console.log('write');
      fs.writeFileSync(filename, json);
    }
  }
});
const fa = actions.fetch(id);
if (Array.isArray(fa)) {
  fa.map((a) => store.dispatch(a));
} else {
  store.dispatch(fa);
}
