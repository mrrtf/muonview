import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingLeft: theme.spacing(3),
    flexGrow: 1,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <p>footer here</p>
    </Paper>
  );
};
export default Footer;
