import React from "react";
import PropTypes from "prop-types";

const DataSourceListButton = ({ listDataSources }) => (
  <button type="button" arial-label="list" onClick={() => listDataSources()}>
    Data Source List
  </button>
);

DataSourceListButton.propTypes = {
  listDataSources: PropTypes.func.isRequired,
};

export default DataSourceListButton;
