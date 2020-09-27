import { isEqual } from "lodash";
import expect from "expect";
import reducer, {
  selectors,
  initialState,
  setIsLoading,
  clearIsLoading,
} from "./envelop";

describe("ctor", () => {
  const ini = reducer(undefined, {});
  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });
});

describe("envelop reducer", () => {
  describe("fetch deplane", () => {
    test("fetch deplane should set corresponding isLoading on empty state", () => {
      const state = reducer(
        {},
        {
          type: "FETCH_DEPLANE",
          payload: {
            id: {
              deid: 300,
              bending: true,
            },
          },
        }
      );
      expect(state.isLoading).toBeArray();
      expect(state.isLoading).toIncludeSameMembers([
        { deid: 300, bending: true },
      ]);
    });
    test("fetch deplane should add elements to isLoading on non-empty state", () => {
      const state = reducer(
        {
          isLoading: [{ deid: 300, bending: true }],
        },
        {
          type: "FETCH_DEPLANE",
          payload: {
            id: {
              deid: 819,
              bending: false,
            },
          },
        }
      );
      expect(state.isLoading).toBeArray();
      expect(state.isLoading).toIncludeSameMembers([
        { deid: 819, bending: false },
        { deid: 300, bending: true },
      ]);
    });
  });
  describe("fetch dualsampas", () => {
    test("fetch dualsampas should set corresponding isLoading on empty state", () => {
      const state = reducer(
        {},
        {
          type: "FETCH_DUALSAMPAS",
          payload: {
            id: {
              deid: 300,
              bending: true,
              dsid: null,
            },
          },
        }
      );
      expect(state.isLoading).toBeArray();
      expect(state.isLoading).toIncludeSameMembers([
        { deid: 300, bending: true, dsid: null },
      ]);
    });
  });
  describe("receive deplane", () => {
    test("receive deplane should reset corresponding isLoading", () => {
      const state = reducer(
        { isLoading: [{ deid: 300, bending: true }] },
        {
          type: "RECEIVE_DEPLANE",
          payload: {
            id: {
              deid: 300,
              bending: true,
            },
            response: null,
          },
        }
      );
      expect(state.isLoading).toBeArray();
      expect(state.isLoading).toBeEmpty();
    });
    it("should return single des key starting from basic state", () => {
      const expected = {
        des: {
          100: {
            bending: {
              dummy: true,
            },
          },
        },
      };
      const got = reducer(
        { des: {} },
        {
          type: "RECEIVE_DEPLANE",
          payload: {
            id: { deid: 100, bending: true },
            response: {
              dummy: true,
            },
          },
        }
      );
      expect(got).toEqual(expected);
    });
  });
  describe("receive dualsampas", () => {
    test("receive dualsampas should reset corresponding isLoading", () => {
      const state = reducer(
        { isLoading: [{ deid: 300, bending: true, dsid: null }] },
        {
          type: "RECEIVE_DUALSAMPAS",
          payload: {
            id: {
              deid: 300,
              bending: true,
              dsid: null,
            },
            response: null,
          },
        }
      );
      expect(state.isLoading).toBeArray();
      expect(state.isLoading).toBeEmpty();
    });
    it("should return specific shape for dualsampas", () => {
      const expected = {
        des: {
          100: {
            "non-bending": {
              dualsampas: {
                1025: {
                  id: {
                    deid: 100,
                    bending: false,
                    dsid: 1025,
                  },
                  vertices: [],
                  value: 1025,
                },
              },
            },
          },
        },
      };
      const got = reducer(
        {},
        {
          type: "RECEIVE_DUALSAMPAS",
          payload: {
            id: { deid: 100, bending: false, dsid: null },
            response: [
              {
                id: 1025,
                vertices: [],
              },
            ],
          },
        }
      );
      expect(got).toEqual(expected);
    });
  });
});

describe("envelop selector", () => {
  const expected = false;
  const state = {
    des: {
      819: {
        id: { deid: 819 },
        "non-bending": {
          isLoading: expected,
        },
      },
    },
  };
  it("should return expected value", () => {
    expect(selectors.isLoading(state, { deid: 819, bending: false })).toBe(
      false
    );
  });
  it("should return same as before", () => {
    const e = selectors.envelop(state, { deid: 819, bending: false });
    expect(e.isLoading).toBe(expected);
  });
});

describe("envelop isLoading", () => {
  it("setIsLoading changes state", () => {
    const state = {};
    const expected = {
      isLoading: [{ deid: 819, bending: true }],
    };
    setIsLoading(state, { deid: 819, bending: true });
    expect(state).toStrictEqual(expected);
  });
  it("clearIsLoading changes state", () => {
    const expected = { isLoading: [] };
    const state = {
      isLoading: [{ deid: 819, bending: true }],
    };
    clearIsLoading(state, { deid: 819, bending: true });
    expect(state).toStrictEqual(expected);
  });
});

test("includes", () => {
  const a = [{ deid: 100, bending: false, dsid: 102 }];
  expect(
    a.findIndex((i) => isEqual(i, { deid: 100, bending: false, dsid: 102 }))
  ).toBeGreaterThan(-1);
});
