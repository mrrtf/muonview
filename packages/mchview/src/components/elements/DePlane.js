import React from 'react';
import { scaleSequential } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';
import PropTypes from 'prop-types';
import SVGGroup from './SVGGroup';
import Polygon from './Polygon';
import { encode } from '../../categories';

const DePlane = ({ deplane, outlineStyle }) => {
  const color = scaleSequential()
    .domain([100, 1025])
    .interpolator(interpolateViridis);

  return (
    <SVGGroup groupname="deplane" style={outlineStyle}>
      <Polygon
        key={encode(deplane.id)}
        prefix="DE"
        poly={deplane}
        fillColor={color(101)}
      />
    </SVGGroup>
  );
};

DePlane.propTypes = {
  deplane: PropTypes.object,
  outlineStyle: PropTypes.object,
};

export default DePlane;
