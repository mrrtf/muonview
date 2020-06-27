import React from 'react';
import PropTypes from 'prop-types';

const DataSourceListButton = ({ listDataSources }) => <button onClick={() => listDataSources()}>Data Source List</button>;

DataSourceListButton.propTypes = {
  listDataSources: PropTypes.func.isRequired,
};

export default DataSourceListButton;
