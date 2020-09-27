import { cloneDeep } from "lodash";
import * as categories from "../categories";

// action types
export const types = {
  ALL: "OUTLINE/ALL",
  NONE: "OUTLINE/NONE",
  TOGGLE: "OUTLINE/TOGGLE",
};

// initial state
export const initialState = {
  [categories.de.key]: {
    show: false,
    stroke: "#333333",
    strokeWidth: 0.7,
    disabled: true,
  },
  [categories.deplane.key]: {
    show: false,
    stroke: "#333333",
    strokeWidth: 0.7,
  },
  [categories.chamber.key]: {
    show: false,
    stroke: "black",
    strokeWidth: 0.5,
    disabled: true,
  },
  [categories.ds.key]: { show: false, stroke: "black", strokeWidth: 0.3 },
  [categories.pad.key]: { show: false, stroke: "black", strokeWidth: 0.1 },
  [categories.cluster.key]: { show: false, stroke: "black", strokeWidth: 0.1 },
  [categories.area.key]: { show: false, stroke: "blue", strokeWidth: 0.1 },
};

// reducer
export default (state = initialState, action) => {
  if (state === undefined) {
    return initialState;
  }
  if (action.type === types.TOGGLE) {
    const { category } = action.payload;
    const ns = cloneDeep(state);
    ns[category.key].show = !ns[category.key].show;
    return ns;
  }
  if (action.type === types.ALL) {
    const ns = cloneDeep(state);
    categories.all.forEach((x) => {
      ns[x.key].show = true;
    });
    return ns;
  }
  if (action.type === types.NONE) {
    const ns = cloneDeep(state);
    categories.all.forEach((x) => {
      ns[x.key].show = false;
    });
    return ns;
  }
  return state;
};

// action creators
export const actions = {
  toggleOutline: (category) => ({
    type: types.TOGGLE,
    payload: {
      category,
    },
  }),

  showOutlineForAll: () => ({
    type: types.ALL,
  }),

  showOutlineForNone: () => ({
    type: types.NONE,
  }),
};

// selectors
export const selectors = {
  isVisible: (state, category) => {
    if (categories.isValidCategory(category)) {
      return state[category.key].show;
    }
    return false;
  },
  style: (state, category) => {
    if (categories.isValidCategory(category)) {
      return state[category.key];
    }
    return {};
  },
  getAllSelected: (state) =>
    categories.all.every((x) => state[x.key].show === true),
  getNoneSelected: (state) =>
    categories.all.every((x) => state[x.key].show === false),
};
