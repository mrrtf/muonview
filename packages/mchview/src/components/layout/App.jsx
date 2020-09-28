import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainStage from "./MainStage";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
  container: {
    flexFlow: "column nowrap",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item>
        <MainStage />
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default App;
