import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Use `OutlineSelectorButton` to control the look of the outline
 * of one detector part
 */

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    '& button': {
      padding: '5px',
    },
  },
});

const OutlineSelectorButton = ({
  label, value, onChange, disabled,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <IconButton
        color="primary"
        disabled={disabled}
        arial-label="expand outline color panel"
      >
        <BorderColorIcon />
      </IconButton>
      <IconButton
        color="primary"
        disabled={disabled}
        aria-label="expand outline width panel"
      >
        <LineWeightIcon />
      </IconButton>
      <FormControlLabel
        control={
          <Switch checked={value} onChange={onChange} disabled={disabled} />
        }
        label={label}
      />
    </Box>
  );
};

OutlineSelectorButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default OutlineSelectorButton;
