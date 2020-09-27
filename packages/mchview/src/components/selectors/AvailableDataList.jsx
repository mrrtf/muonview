import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import GetAppIcon from "@material-ui/icons/GetApp";
import PropTypes from "prop-types";

const AvailableDataList = ({ dataList }) => {
  const list = dataList.map((x) => {
    const sub = `${x.format} - ${x.indexSize} events`;
    return (
      <ListItem key={x.sha256}>
        <ListItemText primary="digits" />
        <ListItemText primary={x.filename} secondary={sub} />
        <ListItemSecondaryAction>
          <IconButton aria-label="load">
            <GetAppIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return <List>{list}</List>;
};

AvailableDataList.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      format: PropTypes.string,
      indexSize: PropTypes.number,
      filename: PropTypes.filename,
    })
  ),
};
export default AvailableDataList;
