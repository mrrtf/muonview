import React from 'react';
import DePlaneView from './DePlaneView';

const DeView = ({ id }) => (
  <>
    <DePlaneView id={{ deid: id.deid, bending: false }} />
    <DePlaneView id={{ deid: id.deid, bending: true }} />
  </>
);

export default DeView;
