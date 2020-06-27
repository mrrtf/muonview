import React from 'react';
import { scaleSequential } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';
import PropTypes from 'prop-types';
import SVGGroup from './SVGGroup';
import Polygon from './Polygon';

import { encode } from '../../categories';

const colorDS = scaleSequential()
  .domain([0, 1500])
  .interpolator(interpolateViridis);

const DualSampas = ({ ds, outlineStyle }) => {
  if (ds === undefined) {
    return null;
  }
  const dspoly = [];
  Object.keys(ds).forEach((key) => {
    const single = ds[key];
    dspoly.push(
      <Polygon
        classname="ds"
        key={encode(single.id)}
        poly={single}
        fillColor={colorDS(single.value)}
      />,
    );
  });

  return (
    <SVGGroup groupname="dualsampas" style={outlineStyle}>
      {dspoly}
    </SVGGroup>
  );
};

DualSampas.propTypes = {
  ds: PropTypes.object,
  outlineStyle: PropTypes.object,
};

export default DualSampas;
