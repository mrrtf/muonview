import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MchViewPort from "./MchViewPort";
import RightPanel from "./RightPanel";
import AreaSelector from "../selectors/AreaSelector";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
});

const MainStage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <MchViewPort />
      </Router>
      <RightPanel>
        <AreaSelector />
      </RightPanel>
    </div>
  );
};

export default MainStage;
