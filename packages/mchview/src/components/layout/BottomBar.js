import React from 'react';
import CurrentElement from '../ui/CurrentElement';

// import DataSourceCreateButton from "../ui/DataSourceCreateButton";
// import DataSourceListButton from "../ui/DataSourceListButton";
// import DataSourceSelector from "../selectors/DataSourceSelector";
//
// const listDataSources = () => {
//   alert("titi");
// };

const BottomBar = () => (
  <div>
    {/* <DataSourceCreateButton /> */}
    {/* <DataSourceSelector /> */}
    {/* <DataSourceListButton listDataSources={() => listDataSources()} /> */}
    <CurrentElement />
  </div>
);
export default BottomBar;
