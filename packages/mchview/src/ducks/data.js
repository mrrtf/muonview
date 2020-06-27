// action types
export const types = {
  SET: 'DATA/SET',
  SET_DS_VALUE: 'DATA/SET_DS_VALUE',
  RANDOM_DATA: 'DATA/RANDOM_DATA',
};

// initial state
export const initialState = {
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
      value: 11,
    },
  ],
};

// action creators
export const actions = {
  setData: (source, content) => ({
    type: types.SET,
    payload: {
      source,
      content,
    },
  }),
  setDsValue: (dsid, value) => ({
    type: types.SET_DS_VALUE,
    payload: {
      dsid,
      value,
    },
  }),
  randomData: (deid, bending, dsids) => ({
    type: types.RANDOM_DATA,
    payload: {
      deid,
      bending,
      dsids,
    },
  }),
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.RANDOM_DATA) {
    console.log(action.payload.dsids);
    return state;
  }
  if (action.type === types.SET) {
    return {
      ...state,
      source: action.payload.source,
      content: action.payload.content,
    };
  }
  if (action.type === types.SET_DS_VALUE) {
    throw new Error('Re-implement me with immer');
    // const newContent = [...state.content];
    // const { dsid } = action.payload;
    // let newds = true;
    // newContent.map((x) => {
    //   if (x.dsid === dsid) {
    //     x.value = action.payload.value;
    //     newds = false;
    //   }
    // });
    // if (newds) {
    //   return {
    //     ...state,
    //     content: newContent.concat({
    //       dsid: action.payload.dsid,
    //       value: action.payload.value,
    //     }),
    //   };
    // }
    // return { ...state, content: newContent };
  }
  return state;
};

// selectors
export const selectors = {
  source: (state) => state.source,
  content: (state) => state.content,
  dsValue: (state, dsid) => {
    let v = -1;
    state.content.forEach((x) => {
      if (x.dsid === dsid) {
        v = x.value;
      }
    });
    return v;
  },
};
