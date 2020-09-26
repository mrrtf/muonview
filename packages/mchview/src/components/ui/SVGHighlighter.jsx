import React from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { encode } from "../../categories";
import polygon from "../elements/Polygon";
import * as categories from "../../categories";

const isWithin = (parent, child) => {
  // FIXME: implement this properly for all categories
  if (
    categories.whatis(parent) === categories.deplane &&
    categories.whatis(child) === categories.ds
  ) {
    return parent.deid === child.deid && parent.bending === child.bending;
  }
  if (
    categories.whatis(parent) === categories.deplane &&
    categories.whatis(child) === categories.pad
  ) {
    return parent.deid === child.deid;
  }
  return false;
};

const SVGHighlighter = ({ id, color = "yellow" }) => {
  const poly = useSelector((state) => state.view.currentElement);

  if (!poly) {
    return null;
  }
  if (!poly.vertices) {
    return null;
  }
  if (!isWithin(id, poly.id)) {
    return null;
  }

  const sizeIncreaseFactor = 1.5;

  const style = {
    ...poly.style,
    fill: "none",
    stroke: color,
    strokeWidth: Math.max(
      0.01,
      parseFloat(poly.style.strokeWidth, 10) * sizeIncreaseFactor
    ),
  };

  return (
    <polygon
      className="toto"
      id={encode(poly.id)}
      key={encode(poly.id)}
      data-value={poly.value}
      points={poly.vertices.map((v) => [v.x, v.y].join(","))}
      pointerEvents="none"
      style={style}
    />
  );
};

SVGHighlighter.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number.isRequired,
    bending: PropTypes.bool,
    dsid: PropTypes.number,
  }),
  color: PropTypes.string,
};

export default SVGHighlighter;
