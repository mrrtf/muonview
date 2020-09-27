import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const loc = useLocation();
  const msg = `URL ${loc.pathname} not found on this server`;

  return (
    <Alert severity="error">
      <Typography>{msg}</Typography>
    </Alert>
  );
};

export default NotFound;
