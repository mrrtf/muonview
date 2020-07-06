import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlineSelector from '../selectors/OutlineSelector';
import * as categories from '../../categories';

const useStyles = makeStyles({
  root: { backgroundColor: 'yellow' },
});

const TopBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <OutlineSelector
        elements={[categories.deplane, categories.ds, categories.cluster]}
      />
    </div>
  );
};

export default TopBar;
