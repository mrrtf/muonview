/* eslint no-param-reassign: ["error", { "props": false }] */
import { normalize, schema } from "normalizr";
// import { merge, cloneDeep } from "lodash";
// import de100 from "../store/detection-element-100-all-dual-sampas.json";
import { isEqual, omit, defaultsDeep } from "lodash";
import produce from "immer";
import * as categories from "../categories";

const mappingServer = () => "http://localhost:8080/v2";

export const dePlaneName = (bending) =>
  bending === "true" || bending === true ? "bending" : "non-bending";

// initial state
export const initialState = {};

/// export const initialState = { ...de100 };

export const clearIsError = (draft, id) => {
  if (draft.isError) {
    draft.isError = draft.isError.filter((i) => !isEqual(id, i));
  }
};

export const setIsLoading = (draft, id) => {
  defaultsDeep(draft, { isLoading: [] });
  draft.isLoading.push(id);
  clearIsError(draft, id);
};

export const clearIsLoading = (draft, id) => {
  if (draft.isLoading) {
    draft.isLoading = draft.isLoading.filter((i) => !isEqual(id, i));
  }
};

export const setIsError = (draft, id) => {
  defaultsDeep(draft, { isError: [] });
  draft.isError.push(id);
  clearIsLoading(draft, id);
};

const deIdAndPlaneName = (id) => ({
  deid: id.deid,
  planeName: dePlaneName(id.bending),
});

const reshapeDualSampas = (payload) => {
  const dep = payload.id;
  const dualsampa = new schema.Entity("dualsampas", undefined, {
    // append the deid to the dualsampa object
    processStrategy: (entity) => ({
      ...entity,
      id: { deid: dep.deid, bending: dep.bending, dsid: entity.id },
      value: entity.id,
    }),
  });
  const normalizedData = normalize(payload.response, [dualsampa]);
  return {
    dualsampas: normalizedData.entities.dualsampas,
    dsids: normalizedData.result,
  };
};

// reducer
export default produce((draft, action) => {
  if (action.type === "FETCH_DUALSAMPAS") {
    return setIsLoading(draft, action.payload.id);
  }
  if (action.type === "ERROR_FETCH_DUALSAMPAS") {
    return setIsError(draft, action.payload.id);
  }
  if (action.type === "RECEIVE_DUALSAMPAS") {
    clearIsLoading(draft, action.payload.id);
    const { deid, planeName } = deIdAndPlaneName(action.payload.id);
    defaultsDeep(draft, {
      des: { [deid]: { [planeName]: { dualsampas: {} } } },
    });
    if (action.payload.response) {
      draft.des[deid][planeName].dualsampas = reshapeDualSampas(
        action.payload
      ).dualsampas;
    }
    return draft;
  }

  if (action.type === "FETCH_DEPLANE") {
    return setIsLoading(draft, action.payload.id);
  }
  if (action.type === "ERROR_FETCH_DEPLANE") {
    return setIsError(draft, action.payload.id);
  }
  if (action.type === "RECEIVE_DEPLANE") {
    const newdata = omit(action.payload.response, ["id", "bending"]);
    clearIsLoading(draft, action.payload.id);
    const { deid, planeName } = deIdAndPlaneName(action.payload.id);
    defaultsDeep(draft, {
      des: { [deid]: { [planeName]: {} } },
    });
    draft.des[deid][planeName] = newdata;
    return draft;
  }
  return draft;
}, initialState);

// action creators
export const actions = {
  fetch: (id) => {
    switch (categories.whatis(id)) {
      case categories.de:
        if (!categories.isSpecific(id)) {
          throw new Error("implement loop over de here");
        }
        return [
          actions.fetch({ deid: id.deid, bending: true }),
          actions.fetch({ deid: id.deid, bending: false }),
        ];
      case categories.deplane:
        return {
          type: "DEPLANE",
          payload: {
            request: {
              url: `${mappingServer()}/degeo?deid=${id.deid}&bending=${
                id.bending
              }`,
              id,
            },
          },
        };
      case categories.ds:
        if (categories.isSpecific(id)) {
          throw new Error(
            `not implemented for a given dsid=${JSON.stringify(id)}`
          );
        }
        if (!categories.hasBending(id)) {
          return [
            actions.fetch({ deid: id.deid, bending: true }),
            actions.fetch({ deid: id.deid, bending: false }),
            actions.fetch({ deid: id.deid, bending: true, dsid: null }),
            actions.fetch({ deid: id.deid, bending: false, dsid: null }),
          ];
        }
        return {
          type: "DUALSAMPAS",
          payload: {
            request: {
              url: `${mappingServer()}/dualsampas?deid=${id.deid}&bending=${
                id.bending
              }`,
              id,
            },
          },
        };
      default:
        throw new Error(`no action known for id=${JSON.stringify(id)}`);
    }
  },
};

/*
 * Extract from the state a polygon describing the envelop of the given element
 */
const extractEnvelop = (state, id) => {
  if (state.des === undefined) {
    return undefined;
  }
  switch (categories.whatis(id)) {
    case categories.de:
      if (state.des) {
        return state.des[id.deid];
      }
      return undefined;
    case categories.deplane:
      if (
        state.des &&
        state.des[id.deid] &&
        state.des[id.deid][dePlaneName(id.bending)]
      ) {
        return {
          id,
          ...state.des[id.deid][dePlaneName(id.bending)],
        };
      }
      return undefined;
    case categories.ds:
      if (
        state.des &&
        state.des[id.deid] &&
        state.des[id.deid][dePlaneName(id.bending)] &&
        state.des[id.deid][dePlaneName(id.bending)].dualsampas
      ) {
        return state.des[id.deid][dePlaneName(id.bending)].dualsampas;
      }
      return undefined;
    default:
      throw new Error(`category for ${JSON.stringify(id)} not handled (yet?)`);
  }
};

// selectors
export const selectors = {
  envelop: (state, id) => extractEnvelop(state, id),
  isLoading: (state, id) =>
    state.isLoading
      ? state.isLoading.findIndex((i) => isEqual(i, id)) >= 0
      : false,
  isError: (state, id) =>
    state.isError ? state.isError.findIndex((i) => isEqual(i, id)) >= 0 : false,
};
