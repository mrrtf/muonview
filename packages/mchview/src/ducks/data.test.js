import expect from 'expect';
import dataReducer, { actions, types, selectors } from './data.js';
import initialState from '../store/initialState.json';

describe('actions', () => {
  it('should create an action to set the data with 2 dsids', () => {
    const expected = {
      type: types.SET,
      payload: {
        source: 1,
        content: [
          {
            dsid: 1234,
            value: 12.34,
          },
          {
            dsid: 5678,
            value: 56.78,
          },
        ],
      },
    };
    expect(
      actions.setData(1, [
        { dsid: 1234, value: 12.34 },
        { dsid: 5678, value: 56.78 },
      ]),
    ).toEqual(expected);
  });

  it('should create an action to set the data of one given ds', () => {
    const expected = {
      type: types.SET_DS_VALUE,
      payload: {
        dsid: 1132,
        value: 510,
      },
    };
    expect(actions.setDsValue(1132, 510)).toEqual(expected);
  });
});

describe('data reducer', () => {
  const ini = dataReducer(undefined, {});
  it('should return the initial state', () => {
    expect(ini).toEqual(initialState.data);
  });
});

describe('apply action to set one value', () => {
  const ini = dataReducer(undefined, {});
  const added = {
    source: 1,
    content: [
      {
        dsid: 1125,
        value: 11,
      },
      {
        dsid: 1126,
        value: 12,
      },
      {
        dsid: 1132,
        value: 0.5,
      },
    ],
  };

  it('should return the initial state + {dsid:1132,value:0.5}', () => {
    expect(dataReducer(ini, actions.setDsValue(1132, 0.5))).toEqual(added);
  });
});

describe('adding twice should not add second time', () => {
  const ini = {
    source: 1,
    content: [
      {
        dsid: 1125,
        value: 11,
      },
      {
        dsid: 1126,
        value: 12,
      },
      {
        dsid: 1132,
        value: 510,
      },
    ],
  };
  const added = {
    source: 1,
    content: [
      {
        dsid: 1125,
        value: 11,
      },
      {
        dsid: 1126,
        value: 12,
      },
      {
        dsid: 1132,
        value: 0.5,
      },
    ],
  };

  it('should return added', () => {
    expect(dataReducer(ini, actions.setDsValue(1132, 0.5))).toEqual(added);
  });
});

describe('data selector', () => {
  const ini = dataReducer(undefined, {});
  it('value of dsid=1126 should be 12', () => {
    expect(selectors.dsValue(ini, 1126)).toEqual(12);
  });
});
