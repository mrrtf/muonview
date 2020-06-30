import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import DePlane from '../elements/DePlane';
import DualSampas from '../elements/DualSampas';
import DePlaneSelector from '../selectors/DePlaneSelector';
import SVGView from './SVGView';
import SVGHighlighter from '../ui/SVGHighlighter';
import useEnvelop from '../../hooks/useEnvelop';
import OutlineSelector from '../selectors/OutlineSelector';
import * as categories from '../../categories';
// import OutlineStyleSelector from "../selectors/OutlineStyleSelector";
import Cluster from '../elements/Cluster';
import pads from '../../store/cluster.json';

/* <OutlineStyleSelector */
/*   value={deOutlineStyle.strokeWidth} */
/*   onChange={value => { */
/*     setDeOutlineStyle({ ...deOutlineStyle, strokeWidth: value }); */
/*   }} */
/* /> */

const cluster = {
  ...pads,
};

const DePlaneView = ({ id }) => {
  const history = useHistory();

  const { isLoading: isFetchingDePlane, geo: deplane } = useEnvelop(id);
  const { isLoading: isFetchingDualSampas, geo: ds } = useEnvelop({
    ...id,
    dsid: null,
  });

  const [deOutlineStyle] = useState({
    stroke: 'lightpink',
    strokeWidth: 0.7,
  });

  const [dsOutlineStyle] = useState({
    stroke: 'lightblue',
    strokeWidth: 0.5,
  });

  const dsAvailable = isFetchingDualSampas === false && ds != null;

  const dePlaneAvailable = isFetchingDePlane === false && deplane != null;

  const clusterAvailable = true;

  const [isDsVisible, setIsDsVisible] = useState(false);
  const [isDePlaneVisible, setIsDePlaneVisible] = useState(true);
  const [isClusterVisible, setIsClusterVisible] = useState(true);

  if (isFetchingDePlane === true || isFetchingDualSampas === true) {
    return <CircularProgress />;
  }

  const xoff = deplane ? -(deplane.x - deplane.sx / 2.0) : 0;
  const yoff = deplane ? -(deplane.y - deplane.sy / 2.0) : 0;

  const elements = [];
  elements.push({
    name: categories.deplane.name,
    visible: isDePlaneVisible && dePlaneAvailable,
    available: dePlaneAvailable,
    toggle: () => {
      setIsDePlaneVisible((v) => !v);
    },
  });

  elements.push({
    name: categories.ds.name,
    visible: isDsVisible && dsAvailable,
    available: dsAvailable,
    toggle: () => {
      setIsDsVisible((v) => !v);
    },
  });

  elements.push({
    name: categories.cluster.name,
    visible: isClusterVisible && clusterAvailable,
    available: clusterAvailable,
    toggle: () => {
      setIsClusterVisible((v) => !v);
    },
  });

  return (
    <div>
      <Box display="flex">
        <OutlineSelector elements={elements} />
        <DePlaneSelector
          id={id}
          setId={({ deid, bending }) => {
            history.push({
              pathname: '/deplane',
              search: `?deid=${deid}&bending=${bending}`,
            });
          }}
        />
      </Box>
      <main>
        <SVGView
          geo={deplane}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          {isDePlaneVisible && (
            <DePlane outlineStyle={deOutlineStyle} deplane={deplane} />
          )}
          {isDsVisible && dsAvailable ? (
            <DualSampas outlineStyle={dsOutlineStyle} ds={ds} />
          ) : null}
          {isClusterVisible && clusterAvailable ? (
            <>
              <Cluster bending={id.bending} cluster={cluster} />
              <Cluster bending={!id.bending} cluster={cluster} />
            </>
          ) : null}
          {/* <Area /> */}
          <SVGHighlighter id={id} color="red" />
        </SVGView>
        {deplane ? null : <h1>something is wrong</h1>}
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
};

export default DePlaneView;
