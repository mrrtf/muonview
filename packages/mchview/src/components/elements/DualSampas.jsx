import React from "react";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";
import PropTypes from "prop-types";
import SVGGroup from "./SVGGroup";
import Polygon from "./Polygon";

import { encode } from "../../categories";

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DualSampas = ({ geo, outlineStyle }) => {
  if (geo === undefined) {
    return null;
  }
  const dspoly = [];
  Object.keys(geo).forEach((key) => {
    const single = geo[key];
    dspoly.push(
      <Polygon
        classname="ds"
        key={encode(single.id)}
        poly={single}
        fillColor={colorDS(single.value)}
      />
    );
  });

  return (
    <SVGGroup groupname="dualsampas" style={outlineStyle}>
      {dspoly}
    </SVGGroup>
  );
};

DualSampas.propTypes = {
  geo: PropTypes.object,
  outlineStyle: PropTypes.object,
};

export default DualSampas;
