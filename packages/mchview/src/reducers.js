import { combineReducers } from "redux";
import outlineReducer, { selectors as outlineSelectors } from "./ducks/outline";
import viewReducer, { selectors as viewSelectors } from "./ducks/view";
import dataReducer, { selectors as dataSelectors } from "./ducks/data";
import envelopReducer, { selectors as envelopSelectors } from "./ducks/envelop";

import visibilityReducer, {
  selectors as visibilitySelectors,
} from "./ducks/visibility";
import areaReducer from "./ducks/area";

export default combineReducers({
  outline: outlineReducer,
  view: viewReducer,
  visibility: visibilityReducer,
  area: areaReducer,
  data: dataReducer,
  envelop: envelopReducer,
  datasources: (state = {}) => state,
});

// selectors
// here state is the top level app state, and
// we are using lower-level selectors which deals with partial state

export const selectors = {
  isModalVisible: (state) =>
    visibilitySelectors.isModalVisible(state.visibility),
  isRightPanelVisible: (state) =>
    visibilitySelectors.isRightPanelVisible(state.visibility),
  currentElement: (state) => viewSelectors.currentElement(state.view),
  area: (state) => state.area,
  dsValue: (state, dsid) => dataSelectors.dsValue(state.data, dsid),
  isVisible: (state, category) =>
    outlineSelectors.isVisible(state.outline, category),
  outlineStyle: (state, category) =>
    outlineSelectors.style(state.outline, category),
  isFetching: (state) =>
    selectors.isFetchingDePlane(state, selectors.dePlaneId(state)) ||
    selectors.isFetchingDualSampas(state),
  isFetchingDualSampas: (state) =>
    envelopSelectors.isFetchingDualSampas(
      state.envelop,
      selectors.dePlaneId(state)
    ),
  isFetchingDe: () => false,
  isFetchingDePlane: (state, id) =>
    envelopSelectors.isFetchingDePlane(state.envelop, id),
  degeo: (state) =>
    envelopSelectors.deplane(state.envelop, selectors.dePlaneId(state)),
  dualsampas: (state) =>
    envelopSelectors.dualsampas(state.envelop, selectors.dePlaneId(state)),
  envelop: (state, id) => envelopSelectors.envelop(state.envelop, id),
  // isAvailable: (state, category) => {
  //   if (isEqual(categories.de, category)) {
  //     return envelopSelectors.hasDe(selectors.deid(state));
  //   }
  //   if (isEqual(categories.deplane, category)) {
  //     return envelopSelectors.hasDePlane(selectors.dePlaneId(state));
  //   }
  //   return false;
  // }
};
