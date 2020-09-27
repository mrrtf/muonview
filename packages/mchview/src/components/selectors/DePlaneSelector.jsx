import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { isValidDeId } from "../../categories";
import listOfValidDeIds from "../../listOfValidDeIds";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  textfield: {
    width: "10em",
  },
});

const delist = listOfValidDeIds.map((x) => x.toString());

const stationId = (x) => {
  const chamber = Math.trunc(+x / 100) + 1;
  const station = Math.trunc(chamber / 2);
  return `Station ${station}`;
};

const DePlaneSelector = ({ id, setId }) => {
  const { deid, bending } = id;
  const classes = useStyles();
  if (!isValidDeId(deid)) {
    return "Invalid DE";
  }
  return (
    <Grid container className={classes.container} alignItems="center">
      <Grid item>
        <Autocomplete
          id="deid-selector"
          options={delist}
          disableClearable
          groupBy={stationId}
          value={deid.toString()}
          onChange={(event, newValue) => setId({ deid: newValue, bending })}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.textfield}
              variant="outlined"
              label="Detection Element"
            />
          )}
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              checked={bending}
              onChange={() => setId({ deid, bending: !bending })}
            />
          }
          label="bending"
          labelPlacement="start"
        />
      </Grid>
    </Grid>
  );
};

DePlaneSelector.propTypes = {
  id: PropTypes.object.isRequired,
  setId: PropTypes.func.isRequired,
};

export default DePlaneSelector;
