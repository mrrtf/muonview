import React from "react";
import PropTypes from "prop-types";

const VerticalLine = ({ x, ymin, ymax, classname }) => {
  if (Number.isNaN(x) || Number.isNaN(ymin) || Number.isNaN(ymax)) {
    return null;
  }
  return (
    <g className={classname}>
      <path d={`M${x} ${ymin} L ${x} ${ymax}`} />
    </g>
  );
};

VerticalLine.propTypes = {
  x: PropTypes.number.isRequired,
  ymin: PropTypes.number.isRequired,
  ymax: PropTypes.number.isRequired,
  classname: PropTypes.string,
};

export default VerticalLine;
