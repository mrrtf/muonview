import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  root: {},
  label: {},
});

const VisibilitySelectorBar = ({ elements, onChange }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      {Object.entries(elements).map(([name, visible]) => (
        <Grid item key={name}>
          <FormControlLabel
            classes={{ label: classes.label, root: classes.root }}
            control={(
              <Switch
                checked={visible}
                onChange={(event) => (onChange
                  ? onChange(event.target.name, event.target.checked)
                  : null)}
                name={name}
              />
            )}
            label={name}
          />
        </Grid>
      ))}
    </Grid>
  );
};

VisibilitySelectorBar.propTypes = {
  elements: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default VisibilitySelectorBar;
