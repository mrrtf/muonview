import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { selectors } from "../../reducers";
import { actions } from "../../ducks/visibility";
import VerticalOpenCloseButton from "../ui/VerticalOpenCloseButton";

const RightPanel = ({ visible, toggleVisibility, children }) => (
  <div>
    <VerticalOpenCloseButton
      isOpening={!visible}
      onClick={() => toggleVisibility()}
    />
    {visible ? <div>{children}</div> : null}
  </div>
);

RightPanel.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  children: PropTypes.object,
};

const mapStateToProps = (state) => ({
  visible: selectors.isRightPanelVisible(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleVisibility: () => dispatch(actions.toggleRightPanel()),
});
export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
