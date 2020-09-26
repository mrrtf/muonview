import expect from "expect";
import { cloneDeep } from "lodash";
import outline, { actions, types, initialState, selectors } from "./outline";
import * as categories from "../categories";

describe("actions", () => {
  Object.keys(categories.all).forEach((x) => {
    const c = categories.all[x];
    it(`should create an action to toggle outline of ${c.name}`, () => {
      const expected = {
        type: types.TOGGLE,
        payload: {
          category: c,
        },
      };
      expect(actions.toggleOutline(c)).toEqual(expected);
    });
  });
});
describe("outline reducer", () => {
  const ini = outline(undefined, {});

  it("should return the initial state", () => {
    expect(ini).toEqual(initialState);
  });

  it("should handle TOGGLE_OUTLINE", () => {
    const expected = cloneDeep(ini);
    expected.de.show = true;
    const r = outline(ini, actions.toggleOutline(categories.de));
    expect(r).toEqual(expected);
  });

  it("should handle SHOW_OUTLINE_FOR_ALL", () => {
    const ns = outline(ini, actions.showOutlineForAll());
    expect(selectors.getAllSelected(ns)).toBe(true);
  });

  it("should handle SHOW_OUTLINE_FOR_NONE", () => {
    const ns = outline(ini, actions.showOutlineForNone());
    expect(selectors.getNoneSelected(ns)).toBe(true);
  });
});

describe("selectors", () => {
  const ini = outline(undefined, {});
  it("should return empty style for non existing layer category", () => {
    const t = selectors.style(ini, "toto");
    expect(t).toEqual({});
  });
  it("should return style for given key, e.g. de", () => {
    const t = selectors.style(
      {
        de: {
          show: true,
          stroke: "#123456",
          strokeWidth: 0.42,
        },
        ds: {
          show: false,
        },
      },
      categories.de
    );
    expect(t).toEqual({ show: true, stroke: "#123456", strokeWidth: 0.42 });
  });
});
