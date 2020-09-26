import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  root: {
    display: "flex",
    margin: 0,
    padding: 0,
    "& li": {
      display: "flex",
      margin: "10px 0",
      padding: "0 0 0 10px",
    },
  },
});

const VisibilitySelectorBar = ({ elements, onChange }) => {
  const classes = useStyles();
  return (
    <div>
      <ul className={classes.root}>
        {Object.entries(elements).map(([name, visible]) => (
          <li key={name}>
            <FormControlLabel
              control={
                <Switch
                  checked={visible}
                  onChange={(event) =>
                    onChange
                      ? onChange(event.target.name, event.target.checked)
                      : null
                  }
                  name={name}
                />
              }
              label={name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

VisibilitySelectorBar.propTypes = {
  elements: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

export default VisibilitySelectorBar;
