import React from "react";
import PropTypes from "prop-types";
import DePlaneView from "./DePlaneView";

const DeView = ({ id }) => (
  <>
    <DePlaneView id={{ deid: id.deid, bending: false }} />
    <DePlaneView id={{ deid: id.deid, bending: true }} />
  </>
);

DeView.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
  }).isRequired,
};

export default DeView;
