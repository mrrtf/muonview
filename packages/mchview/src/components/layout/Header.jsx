import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2, 0) },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  moreButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        {children}
        <IconButton aria-label="more..." className={classes.moreButton}>
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  children: PropTypes.any,
};
export default Header;
