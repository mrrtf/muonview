import React from 'react';
import Cluster from '../elements/Cluster';

import pads from '../../store/cluster.json';

const defaultClusters = {
  ...pads,
};

const ClusterLayer = ({ clusters = defaultClusters }) => (
  <>
    <Cluster bending cluster={clusters} />
    <Cluster bending={false} cluster={clusters} />
  </>
);

export default ClusterLayer;
