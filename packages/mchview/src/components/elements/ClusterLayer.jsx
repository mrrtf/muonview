import React from "react";
import PropTypes from "prop-types";
import Cluster from "./Cluster";

import pads from "../../store/cluster.json";

const defaultClusters = {
  ...pads,
};

const ClusterLayer = ({ clusters = defaultClusters }) => (
  <>
    <Cluster bending cluster={clusters} />
    <Cluster bending={false} cluster={clusters} />
  </>
);
ClusterLayer.propTypes = {
  clusters: PropTypes.array,
};

export default ClusterLayer;
