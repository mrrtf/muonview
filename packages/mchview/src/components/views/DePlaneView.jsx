/* eslint no-param-reassign: ["error", { "props": false }] */
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import produce from 'immer';
import * as categories from '../../categories';
import DePlaneSelector from '../selectors/DePlaneSelector';
import VisibilitySelectorBar from '../selectors/VisibilitySelectorBar';
import SVGHighlighter from '../ui/SVGHighlighter';
import SVGView from './SVGView';
import useEnvelop from '../../hooks/useEnvelop';
import DePlaneLayer from './DePlaneLayer';
import { describeId } from '../../categories';

const useStyles = makeStyles({
  root: {
    background: 'white',
    position: 'fixed',
    top: '0',
    paddingTop: '7px',
    width: '100%',
  },
  main: { 'margin-top': '70px' },
});

const defaultOutlineStyles = {
  [categories.deplane.name]: {
    stroke: 'pink',
    strokeWidth: 0.35,
  },

  [categories.ds.name]: {
    stroke: 'lightblue',
    strokeWidth: 0.15,
  },
};

const createLayer = (layer, id) => {
  const outlineStyle = defaultOutlineStyles[layer.name];
  switch (layer) {
    case categories.deplane:
      return (
        <DePlaneLayer
          key={describeId(id)}
          id={id}
          outlineStyle={outlineStyle}
        />
      );
    default:
      return null;
  }
};

const DePlaneView = ({
  id,
  layers = [
    categories.deplane,
    categories.ds,
    categories.cluster,
    categories.pad,
  ],
}) => {
  const layerStack = layers.map((layer) => createLayer(layer, id));

  const history = useHistory();

  // base layer is special : we must have its geometry to be able
  // to set the SVG stage
  const { isLoading, geo } = useEnvelop(id);

  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    console.log('useEffect');
    const initialState = layers.reduce((acc, cur) => {
      acc[cur.name] = false;
      return acc;
    }, {});
    setIsVisible(initialState);
  }, []);

  const classes = useStyles();
  const onVisibilityChange = (name, newValue) => setIsVisible(
    produce((draft) => {
      draft[name] = newValue;
    }),
  );

  if (isLoading === true) {
    return <CircularProgress />;
  }

  const xoff = geo ? -(geo.x - geo.sx / 2.0) : 0;
  const yoff = geo ? -(geo.y - geo.sy / 2.0) : 0;

  console.log('layers=', layers);
  return (
    <div className={classes.main}>
      <Box className={classes.root} display="flex">
        <VisibilitySelectorBar
          elements={isVisible}
          onChange={onVisibilityChange}
        />
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
          geo={geo}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          {layerStack}
          <SVGHighlighter id={id} color="red" />
        </SVGView>
        {geo ? null : <h1>something is wrong</h1>}
      </main>
    </div>
  );
};

DePlaneView.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
  layers: PropTypes.array,
};

export default DePlaneView;
