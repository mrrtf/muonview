import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import OutlineSelectorButton from './OutlineSelectorButton';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: 0,
    padding: 0,
    '& li': {
      display: 'flex',
      margin: '10px 0',
      padding: '0 0 0 10px',
    },
  },
});

const OutlineSelector = ({ elements }) => {
  const classes = useStyles();
  return (
    <div>
      <ul className={classes.root}>
        {elements.map((x) => (
          <li key={x.name}>
            <OutlineSelectorButton
              label={x.name}
              value={x.visible}
              onChange={() => (x.toggle ? x.toggle() : null)}
              disabled={!x.available}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

OutlineSelector.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      visible: PropTypes.bool.isRequired,
      available: PropTypes.bool.isRequired,
      toggle: PropTypes.func,
    }),
  ),
};

export default OutlineSelector;
