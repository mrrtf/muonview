import * as polylib from "polygon-clipping";

export const vertices2coordinates = (vertices) => {
  const coordinates = vertices.map((v) => [v.x, v.y]);
  return [coordinates];
};

export const vertices2polygon = (vertices) => ({
  type: "Polygon",
  coordinates: vertices2coordinates(vertices),
});

export const cluster2contour = (cluster) => {
  const c = Object.keys(cluster.pads).map(
    (x) => vertices2polygon(cluster.pads[x].vertices).coordinates
  );

  const m = polylib.union(...c);
  return m;
};
