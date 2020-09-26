import React from "react";
import PropTypes from "prop-types";

const Target = ({ x, y, color = "black", scale = 1.0 }) => {
  const w = 4;
  const xleft = x - w;
  const xright = x + w;
  const ytop = y - w;
  const ybottom = y + w;
  const xoff = -x * (scale - 1);
  const yoff = -y * (scale - 1);
  return (
    <g
      pointerEvents="none"
      style={{ fill: "none", stroke: color, strokeWidth: 0.3 }}
      transform={`translate(${xoff},${yoff}) scale(${scale})`}
    >
      <circle cx={x} cy={y} r={1.75} />
      <path d={`M${x} ${y} L ${x} ${ytop}`} />
      <path d={`M${x} ${y} L ${x} ${ybottom}`} />
      <path d={`M${x} ${y} L ${xleft} ${y}`} />
      <path d={`M${x} ${y} L ${xright} ${y}`} />
    </g>
  );
};

Target.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number,
  color: PropTypes.string,
};

export default Target;
