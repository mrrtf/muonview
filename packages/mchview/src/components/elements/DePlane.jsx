import React from "react";
import { scaleSequential } from "d3-scale";
import { interpolateViridis } from "d3-scale-chromatic";
import PropTypes from "prop-types";
import SVGGroup from "./SVGGroup";
import Polygon from "./Polygon";
import { encode } from "../../categories";

const DePlane = ({ geo, outlineStyle }) => {
  if (!geo) {
    return null;
  }
  const color = scaleSequential()
    .domain([100, 1025])
    .interpolator(interpolateViridis);

  return (
    <SVGGroup groupname="deplane" style={outlineStyle}>
      <Polygon
        key={encode(geo.id)}
        prefix="DE"
        poly={geo}
        fillColor={color(101)}
      />
    </SVGGroup>
  );
};

DePlane.propTypes = {
  geo: PropTypes.object,
  outlineStyle: PropTypes.object,
};

export default DePlane;
