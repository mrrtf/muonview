import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  item: {
    margin: theme.spacing(2),
  },
}));

const Loading = ({ message }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3}>
      <Grid container className={classes.container}>
        <Grid item className={classes.item}>
          <CircularProgress />
        </Grid>
        <Grid item className={classes.item}>
          <Typography color="primary">{message}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};
Loading.defaultProps = {
  message: "Code is being loaded... Please wait",
};
export default Loading;
