import React from "react";
import PropTypes from "prop-types";

const SVGGroup = ({ groupname, style, children }) => (
  <g className={groupname} key={groupname} style={style}>
    {children}
  </g>
);
SVGGroup.propTypes = {
  groupname: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
};

export default SVGGroup;
