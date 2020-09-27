import React from "react";
import PropTypes from "prop-types";

const HorizontalLine = ({ y, xmin, xmax, classname }) => {
  if (Number.isNaN(y) || Number.isNaN(xmin) || Number.isNaN(xmax)) {
    return null;
  }
  return (
    <g className={classname}>
      <path d={`M${xmin} ${y} L ${xmax} ${y}`} />
    </g>
  );
};

HorizontalLine.propTypes = {
  y: PropTypes.number.isRequired,
  xmin: PropTypes.number.isRequired,
  xmax: PropTypes.number.isRequired,
  classname: PropTypes.string,
};

export default HorizontalLine;
