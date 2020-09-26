import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});

const DataSourceSlider = ({ name, items, description, kind, onClick }) => {
  const classes = useStyles();
  const [value, setValue] = useState(Math.floor(items.length / 2));

  const handleSliderChange = (event, newValue) => {
    setValue(newValue === "" ? "" : Number(newValue));
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value <= 0) {
      setValue(0);
    } else if (value >= items.length) {
      setValue(items.length - 1);
    }
  };

  let button = { text: "unknown", style: "text" };
  const v = Number(value);
  if (v >= 0 && v < items.length) {
    if (items[v].isLoaded) {
      button = { text: "unload", style: "outlined" };
    } else {
      button = { text: "load", style: "contained" };
    }
    button.text = `${button.text} ${items[v].size} ${kind}`;
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom id="event-slider">
          Event
        </Typography>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                valueLabelDisplay="on"
                min={0}
                max={items.length - 1}
                value={value === "" ? 0 : value}
                onChange={handleSliderChange}
                aria-labelledby="event-slider"
              />
            </Grid>
            <Grid item>
              <Input
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  min: 0,
                  max: items.length - 1,
                  type: "number",
                  label: "Event",
                }}
                aria-labelledby="event-slider"
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle1">{name}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{description}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={() => {
                onClick(value);
              }}
              variant={button.style}
              color="primary"
            >
              {button.text}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

DataSourceSlider.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      isLoaded: PropTypes.bool.isRequired,
      size: PropTypes.number.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DataSourceSlider;
