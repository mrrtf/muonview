/* eslint no-param-reassign: ["error", { "props": false }] */

import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import produce from "immer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import index from "./index.json";
import * as categories from "../../categories";
import SVGHighlighter from "../ui/SVGHighlighter";
import SVGView from "./SVGView";
import useEnvelop from "../../hooks/useEnvelop";
import createLayer from "../elements/LayerCreator";
import DataSourceSlider from "../selectors/DataSourceSlider";
import { actions } from "../../ducks/data";
import multidispatch from "../../actionHelper";
import VisibilitySelectorBar from "../selectors/VisibilitySelectorBar";
import DePlaneViewHeader from "./DePlaneViewHeader";
import Alert from "@material-ui/lab/Alert";
import StatusBar from "../layout/StatusBar";

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
  root: {},
  deplaneview: {
    display: "flex",
    flexFlow: "column nowrap",
    flexGrow: 1,
  },
  main: {
    display: "flex",
  },
});

const defaultOutlineStyles = (theme) => ({
  [categories.deplane.name]: {
    stroke: theme.palette.primary.main,
    strokeWidth: 0.65,
  },

  [categories.ds.name]: {
    stroke: theme.palette.primary.dark,
    strokeWidth: 0.15,
  },
});

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
  // base layer is special : we must have its geometry to be able
  // to set the SVG stage
  const { isLoading, isError, geo } = useEnvelop(id);

  const [isVisible, setIsVisible] = useState(defaultVisibility);

  const classes = useStyles();

  const dispatch = useDispatch();

  const theme = useTheme();

  const layerStack = layers.map((layer) =>
    isVisible[layer.name]
      ? createLayer(layer, id, defaultOutlineStyles(theme)[layer.name])
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
    <div className={classes.deplaneview}>
      <DePlaneViewHeader id={id} />
      <VisibilitySelectorBar
        elements={isVisible}
        onChange={onVisibilityChange}
      />
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
      <StatusBar />
      <section className={classes.main}>
        <SVGView
          geo={geo}
          initialOffset={{ x: xoff, y: yoff }}
          initialZoom={1.0}
        >
          {layerStack}
          <SVGHighlighter id={id} color="red" />
        </SVGView>
        <div>{geo ? null : <h1>something is wrong</h1>}</div>
      </section>
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
