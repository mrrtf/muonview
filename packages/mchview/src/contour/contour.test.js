import * as gjv from "geojson-validation";
import expect from "expect";
import * as contour from "./contour";
import pads from "./pads.json";

describe("vertices2geojson", () => {
  test("pad2polygon", () => {
    const pol = contour.vertices2polygon(pads.pads["500-1-31"].vertices);
    const trace = gjv.isPolygon(pol, true);
    expect(trace).toBeEmpty();
  });
  test("cluster2multipolygon", () => {
    const multipol = {
      type: "MultiPolygon",
      coordinates: [
        contour.vertices2coordinates(pads.pads["500-1-31"].vertices),
        contour.vertices2coordinates(pads.pads["500-1-48"].vertices),
        contour.vertices2coordinates(pads.pads["500-1-49"].vertices),
        contour.vertices2coordinates(pads.pads["500-1-50"].vertices),
      ],
    };
    const trace = gjv.isMultiPolygon(multipol, true);
    expect(trace).toBeEmpty();
  });
});

describe("union", () => {
  test("union", () => {
    const m = contour.cluster2contour(pads);
    const expected =
      "[[[[-15,6.5],[-10,6.5],[-10,7],[-15,7],[-15,6.5]]],[[[47.85714177,-17.5],[48.571427484,-17.5],[48.571427484,-15],[47.85714177,-15],[47.85714177,-17.5]]],[[[50,2.5],[52.5,2.5],[52.5,4.5],[50,4.5],[50,2.5]]],[[[50,17],[52.5,17],[52.5,17.5],[50,17.5],[50,17]]]]";
    expect(JSON.stringify(m)).toBe(expected);
  });
});
