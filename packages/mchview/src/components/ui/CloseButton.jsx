import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { actions } from "../../ducks/visibility";

const CloseButton = ({ hideModal }) => (
  <button onClick={() => hideModal()}>Cancel</button>
);

CloseButton.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(actions.hideModal()),
});

export default connect(null, mapDispatchToProps)(CloseButton);
