// action types
export const types = {
  SET_XMIN: "AREA/SET_XMIN",
  SET_XMAX: "AREA/SET_XMAX",
  SET_YMIN: "AREA/SET_YMIN",
  SET_YMAX: "AREA/SET_YMAX",
};

// initial state
export const initialState = {
  xmin: "10",
  ymin: "10",
  xmax: "12",
  ymax: "15",
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.SET_XMIN) {
    return { ...state, xmin: action.payload.value };
  }
  if (action.type === types.SET_YMIN) {
    return { ...state, ymin: action.payload.value };
  }
  if (action.type === types.SET_XMAX) {
    return { ...state, xmax: action.payload.value };
  }
  if (action.type === types.SET_YMAX) {
    return { ...state, ymax: action.payload.value };
  }
  return state;
};

// action creators
export const actions = {
  setXmin: (value) => ({
    type: types.SET_XMIN,
    payload: {
      value,
    },
  }),
  setYmin: (value) => ({
    type: types.SET_YMIN,
    payload: {
      value,
    },
  }),
  setXmax: (value) => ({
    type: types.SET_XMAX,
    payload: {
      value,
    },
  }),
  setYmax: (value) => ({
    type: types.SET_YMAX,
    payload: {
      value,
    },
  }),
};
