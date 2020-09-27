import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Header from '../layout/Header';
import DePlaneSelector from '../selectors/DePlaneSelector';

const DePlaneViewHeader = ({ id }) => {
  const history = useHistory();
  return (
    <Header>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography>Detection Element Plane View</Typography>
        </Grid>
        <Grid item>
          <DePlaneSelector
            id={id}
            setId={({ deid, bending }) => {
              history.push({
                pathname: '/deplane',
                search: `?deid=${deid}&bending=${bending}`,
              });
            }}
          />
        </Grid>
      </Grid>
    </Header>
  );
};

DePlaneViewHeader.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
};

export default DePlaneViewHeader;
