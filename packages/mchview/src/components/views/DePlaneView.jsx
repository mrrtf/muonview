/* eslint no-param-reassign: ["error", { "props": false }] */

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import produce from "immer";
import Alert from "@material-ui/lab/Alert";
import index from "./index.json";
import * as categories from "../../categories";
import DePlaneSelector from "../selectors/DePlaneSelector";
import VisibilitySelectorBar from "../selectors/VisibilitySelectorBar";
import SVGHighlighter from "../ui/SVGHighlighter";
import SVGView from "./SVGView";
import useEnvelop from "../../hooks/useEnvelop";
import createLayer from "../elements/LayerCreator";
import DataSourceSlider from "../selectors/DataSourceSlider";
import { actions } from "../../ducks/data";
import multidispatch from "../../actionHelper";

const ErrorMessage = ({ message }) => <Alert severity="error">{message}</Alert>;
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
const getItems = (sample) =>
  sample.index.map((x) => ({
    isLoaded: false,
    size: (x.end - x.start) / sample.elemsize,
  }));

const useStyles = makeStyles({
  root: {
    background: "white",
    position: "fixed",
    top: "0",
    paddingTop: "7px",
    width: "98%",
  },
  main: { "margin-top": "70px" },
});

const defaultOutlineStyles = {
  [categories.deplane.name]: {
    stroke: "green",
    strokeWidth: 0.65,
  },

  [categories.ds.name]: {
    stroke: "lightblue",
    strokeWidth: 0.15,
  },
};

const defaultVisibility = {
  [categories.deplane.name]: true,
  [categories.ds.name]: false,
  [categories.cluster.name]: false,
  [categories.pad.name]: false,
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
  const history = useHistory();

  // base layer is special : we must have its geometry to be able
  // to set the SVG stage
  const { isLoading, isError, geo } = useEnvelop(id);

  const [isVisible, setIsVisible] = useState(defaultVisibility);

  const classes = useStyles();

  const dispatch = useDispatch();

  const layerStack = layers.map((layer) =>
    isVisible[layer.name]
      ? createLayer(layer, id, defaultOutlineStyles[layer.name])
      : null
  );

  const onVisibilityChange = (name, newValue) =>
    setIsVisible(
      produce((draft) => {
        draft[name] = newValue;
      })
    );

  if (isLoading === true) {
    return <CircularProgress />;
  }
  if (isError === true) {
    return (
      <ErrorMessage message="could not load data. is the mapping api alive?" />
    );
  }
  const xoff = geo ? -(geo.x - geo.sx / 2.0) : 0;
  const yoff = geo ? -(geo.y - geo.sy / 2.0) : 0;

  const dataSource = {
    url: "http://localhost:3000",
    name: "/Users/laurent/cernbox/o2muon/dpl-digits.bin",
    sha256: "33106022e64a712ec3b5eb8becb7e81c8c0a3196",
  };

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
              pathname: "/deplane",
              search: `?deid=${deid}&bending=${bending}`,
            });
          }}
        />
      </Box>
      <DataSourceSlider
        name={dataSource.name}
        items={getItems(index)}
        description="dplsink"
        kind="digits"
        onClick={(ix) =>
          multidispatch(
            dispatch,
            actions.fetchDigits(dataSource.url, dataSource.sha256, ix)
          )
        }
      />
      <main>
        <SVGView
          geo={geo}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          {layerStack}
          <SVGHighlighter id={id} color="red" />
        </SVGView>
        <div>{geo ? null : <h1>something is wrong</h1>}</div>
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
