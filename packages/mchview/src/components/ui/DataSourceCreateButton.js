import React from 'react';
// import { actions } from "../../ducks/visibility.js";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions as dataActions } from '../../ducks/data.js';
import { actions as envelopActions } from '../../ducks/envelop';
import { selectors } from '../../reducers.js';

const DataSourceCreateButton = ({
  onClick, deid, bending, dsids,
}) => (
  <button
    className={styles.dataSourceCreateButton}
    onClick={() => onClick(deid, bending, dsids)}
  >
    New Data Source
  </button>
);

DataSourceCreateButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  deid: PropTypes.number.isRequired,
  bending: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  // onClick: () => dispatch(actions.showModal())
  onClick: (deid, bending, dsids) => dispatch(dataActions.randomData(deid, bending, dsids)),
});

const mapStateToProps = (state) => ({
  deid: selectors.deid(state),
  bending: selectors.bending(state),
  dsids: selectors.deplane(
    state,
    selectors.deid(state),
    selectors.bending(state),
  ).dsids,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataSourceCreateButton);
