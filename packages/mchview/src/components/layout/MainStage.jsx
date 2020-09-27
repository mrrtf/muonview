import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MchViewPort from './MchViewPort';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const MainStage = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Router>
          <MchViewPort />
        </Router>
      </Grid>
    </Grid>
  );
};

export default MainStage;
