import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import DePlane from '../elements/DePlane';
import useEnvelop from '../../hooks/useEnvelop';

const DePlaneLayer = ({ id, outlineStyle }) => {
  const { isLoading, geo } = useEnvelop(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <DePlane outlineStyle={outlineStyle} deplane={geo} />;
};

DePlaneLayer.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
  outlineStyle: PropTypes.object,
};

export default DePlaneLayer;
