import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
  if (!element) {
    return (
      <Alert className={classes.noelement} severity="info">
        No current element under the (mouse) cursor
      </Alert>
    );
  }
  const { id, value } = element;
  return (
    <div>
      <List>
        <ListItem>
          <ListItemText
            primary={describeId(id)}
            secondary={isValid(id) ? "" : "[ Invalid ID ]"}
          />
        </ListItem>
        <ListItem>
          {value ? <ListItemText primary="Value" secondary={value} /> : null}
        </ListItem>
      </List>
    </div>
  );
};
CurrentElement.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.object,
    value: PropTypes.number,
  }),
};

export default CurrentElement;
