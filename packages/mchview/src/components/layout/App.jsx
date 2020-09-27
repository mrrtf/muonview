import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainStage from "./MainStage";
import StatusBar from "./StatusBar";
import Footer from "./Footer";

const useStyles = makeStyles(() => ({
  container: {
    flexFlow: "column nowrap",
    minHeight: "100vh",
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
        <StatusBar />
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default App;
