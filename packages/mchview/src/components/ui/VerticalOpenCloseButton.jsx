import React from "react";
import PropTypes from "prop-types";

const VerticalOpenCloseButton = ({ isOpening, onClick }) => (
  <button
    type="button"
    aria-label={isOpening ? "open" : "close"}
    onClick={() => onClick()}
  />
);
VerticalOpenCloseButton.propTypes = {
  isOpening: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default VerticalOpenCloseButton;
