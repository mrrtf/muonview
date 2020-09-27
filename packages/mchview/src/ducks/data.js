/* eslint no-param-reassign: ["error", { "props": false }] */
import produce from "immer";
import axios from "axios";
import digits from "../store/digits.json";

// FIXME: consolidate all instance of this reference in some kind of config file?
const mappingAPI = "http://localhost:8080/v2/";

// initial state
export const initialState = {
  digits,
};

// action creators
export const actions = {
  fetchDigits: (sourceURL, hash, indexInFile) => ({
    type: "DIGITS",
    payload: {
      request: {
        url: `${sourceURL}/digits?hash=${hash}&indexid=${indexInFile}`,
      },
    },
  }),
};

const completeDigits = (bareDigits) =>
  new Promise((resolve, reject) => {
    // generate the request for the mapping padlist api

    const padlist = bareDigits.map((x) => ({ deid: x.deid, padid: x.padid }));
    const request = { padlist, keepOrder: true };
    axios
      .post(`${mappingAPI}padlist`, request)
      .then((response) => {
        resolve({ pads: response.data });
      })
      .catch((e) => reject(e));
  });

// reducer
export default produce((draft, action) => {
  if (action.type === "RECEIVE_DIGITS") {
    completeDigits(action.payload.response.digits).then((v) => {
      // FIXME: must put back bare digit info somehow here as well ?
      draft.digits.pads = v;
    });
  }
}, initialState);

// selectors
export const selectors = {};
