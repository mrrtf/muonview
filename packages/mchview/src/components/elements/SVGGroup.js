import React from 'react';

const SVGGroup = ({ groupname, style, children }) => (
  <g className={groupname} key={groupname} style={style}>
    {children}
  </g>
);

export default SVGGroup;
