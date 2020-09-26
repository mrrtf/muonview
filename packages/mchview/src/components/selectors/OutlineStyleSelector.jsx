import React from "react";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LineWeight from "@material-ui/icons/LineWeight";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    // background: "yellow",
    // marginRight: "150px"
  },
  markLabel: {
    transform: "rotate(45deg)",
    paddingTop: "5px",
  },
});

const OutlineStyleSelector = ({ value, onChange }) => {
  const maxValue = 10;
  const defaultValue = 1;
  const step = 0.1;
  const classes = useStyles();

  // const [value, setValue] = useState(defaultValue);

  const handleSliderChange = (event, newValue) => {
    // setValue(newValue);
    onChange(newValue);
  };

  const handleInputChange = (event) => {
    // setValue(event.target.value === "" ? "" : Number(event.target.value));
    onChange(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      // setValue(0);
      onChange(0);
    } else if (value > maxValue) {
      // setValue(maxValue);
      onChange(maxValue);
    }
  };
  const marks = [
    {
      value: 0.1,
      label: "super thin",
    },
    {
      value: 1,
      label: "regular",
    },
    {
      value: maxValue / 2,
      label: "fat",
    },
  ];
  return (
    <>
      <p>Line width</p>
      <p>Line color</p>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <LineWeight />
        </Grid>
        <Grid item xs>
          <Slider
            classes={{
              root: classes.root,
              markLabel: classes.markLabel,
            }}
            value={typeof value === "number" ? value : 0}
            step={step}
            defaultValue={defaultValue}
            marks={marks}
            min={0}
            max={maxValue}
            onChange={handleSliderChange}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min: 0,
              max: maxValue,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

OutlineStyleSelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default OutlineStyleSelector;
