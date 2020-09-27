import React from "react";
import PropTypes from "prop-types";
import SVGGroup from "./SVGGroup";
import { decode } from "../../categories";
import Pad from "./Pad";
import * as contour from "../../contour/contour";
import Polygon from "./Polygon";

const Cluster = ({
  cluster,
  bending = true,
  outlineStyle = {
    stroke: bending ? "green" : "blue",
    strokeWidth: 0.2,
  },
}) => {
  let deid = null;
  const poly = Object.keys(cluster.pads).map((x) => {
    const id = decode(x);
    const { dsid } = id;
    deid = id.deid;
    if (
      (bending === true && dsid < 1024) ||
      (bending === false && dsid >= 1024)
    ) {
      return <Pad key={x} id={id} vertices={cluster.pads[x].vertices} />;
    }
    return null;
  });

  const m = contour.cluster2contour(cluster);
  const precluster = [];
  let i = 0;
  m.forEach((x) => {
    i += 1;
    x.forEach((y) => {
      const vertices = y.map((z) => ({ x: z[0], y: z[1] }));
      const pad = {
        id: { deid, clusterid: i },
        vertices,
        value: 0,
      };
      precluster.push(<Polygon key={i} poly={pad} />);
    });
  });

  return (
    <>
      <SVGGroup groupname="precluster-pads" style={outlineStyle}>
        {poly}
      </SVGGroup>
      <SVGGroup
        groupname="precluster"
        style={{
          fill: "none",
          strokeWidth: 0.3,
          stroke: "gray",
        }}
      >
        {precluster}
      </SVGGroup>
    </>
  );
};

Cluster.propTypes = {
  cluster: PropTypes.object,
  outlineStyle: PropTypes.object,
  bending: PropTypes.bool,
};

export default Cluster;
