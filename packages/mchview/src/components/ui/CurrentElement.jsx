import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { describeId, isValid } from "../../categories";

const useStyles = makeStyles(() => ({
  noelement: {
    flexGrow: 1,
  },
}));

const CurrentElement = ({ element }) => {
  const classes = useStyles();
  let message = "No current element under the (mouse) cursor";
  if (element) {
    const { id, value } = element;
    message = isValid(id) ? describeId(id) : "[ Invalid ID ]";
    if (value) {
      message = message + " | Value" + value;
    }
  }
  return (
    <Alert className={classes.noelement} severity="info">
      {message}
    </Alert>
  );
};
CurrentElement.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.object,
    value: PropTypes.number,
  }),
};

export default CurrentElement;
