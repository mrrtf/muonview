import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CurrentElement from "../ui/CurrentElement";
import { selectors } from "../../reducers";

// import DataSourceCreateButton from "../ui/DataSourceCreateButton";
// import DataSourceListButton from "../ui/DataSourceListButton";
// import DataSourceSelector from "../selectors/DataSourceSelector";
//
// const listDataSources = () => {
//   alert("titi");
// };

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "5px",
    width: "100%",
  },
});

const BottomBar = () => {
  const currentElement = useSelector((state) =>
    selectors.currentElement(state)
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <DataSourceCreateButton /> */}
      {/* <DataSourceSelector /> */}
      {/* <DataSourceListButton listDataSources={() => listDataSources()} /> */}
      <CurrentElement element={currentElement} />
    </div>
  );
};
export default BottomBar;
