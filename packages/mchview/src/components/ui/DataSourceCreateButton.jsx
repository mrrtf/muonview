import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actions as dataActions } from "../../ducks/data";
import { selectors } from "../../reducers";

const DataSourceCreateButton = ({ onClick, deid, bending, dsids }) => (
  <button
    type="button"
    aria-label="create new data source"
    onClick={() => onClick(deid, bending, dsids)}
  >
    New Data Source
  </button>
);

DataSourceCreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
  dsids: PropTypes.arrayOf(PropTypes.number),
};

const mapDispatchToProps = (dispatch) => ({
  // onClick: () => dispatch(actions.showModal())
  onClick: (deid, bending, dsids) =>
    dispatch(dataActions.randomData(deid, bending, dsids)),
});

const mapStateToProps = (state) => ({
  deid: selectors.deid(state),
  bending: selectors.bending(state),
  dsids: selectors.deplane(
    state,
    selectors.deid(state),
    selectors.bending(state)
  ).dsids,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSourceCreateButton);
