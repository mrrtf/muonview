// action types
export const types = {
  SHOW_MODAL: "VISIBILITY/SHOW_MODAL",
  HIDE_MODAL: "VISIBILITY/HIDE_MODAL",
  SHOW_RIGHTPANEL: "VISIBILITY/SHOW_RIGHTPANEL",
  HIDE_RIGHTPANEL: "VISIBILITY/HIDE_RIGHTPANEL",
  TOGGLE_RIGHTPANEL: "VISIBILITY/TOGGLE_RIGHTPANEL",
};

// initial state
export const initialState = {
  rightPanel: false,
  modal: false,
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.SHOW_MODAL) {
    return { ...state, modal: true };
  }
  if (action.type === types.HIDE_MODAL) {
    return { ...state, modal: false };
  }
  if (action.type === types.SHOW_RIGHTPANEL) {
    return { ...state, rightPanel: true };
  }
  if (action.type === types.HIDE_RIGHTPANEL) {
    return { ...state, rightPanel: false };
  }
  if (action.type === types.TOGGLE_RIGHTPANEL) {
    return { ...state, rightPanel: !state.rightPanel };
  }
  return state;
};

// action creators
export const actions = {
  showModal: () => ({ type: types.SHOW_MODAL }),
  hideModal: () => ({ type: types.HIDE_MODAL }),
  showRightPanel: () => ({ type: types.SHOW_RIGHTPANEL }),
  hideRightPanel: () => ({ type: types.HIDE_RIGHTPANEL }),
  toggleRightPanel: () => ({ type: types.TOGGLE_RIGHTPANEL }),
};

// selectors
export const selectors = {
  isModalVisible: (state) => state.modal === true,
  isRightPanelVisible: (state) => state.rightPanel === true,
};
