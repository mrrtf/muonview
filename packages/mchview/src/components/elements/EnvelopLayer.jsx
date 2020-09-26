import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import useEnvelop from "../../hooks/useEnvelop";

const EnvelopLayer = ({ id, outlineStyle, component }) => {
  const { isLoading, geo } = useEnvelop(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  return React.createElement(component, {
    geo,
    outlineStyle,
  });
};

EnvelopLayer.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
  outlineStyle: PropTypes.object,
  component: PropTypes.elementType,
};

export default EnvelopLayer;
