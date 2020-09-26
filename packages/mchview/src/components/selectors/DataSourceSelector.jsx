import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

const DataSourceSelector = ({ url, timestamp, data }) => (
  <ul>
    <li>{url}</li>
    <li>{timestamp}</li>
    <li>{isEmpty(data) ? "NODATA" : "SOMEDATA"}</li>
  </ul>
);

DataSourceSelector.propTypes = {
  url: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = () => ({
  url: "https://wonderful.com",
  timestamp: 42,
  data: {},
});

export default connect(mapStateToProps)(DataSourceSelector);
