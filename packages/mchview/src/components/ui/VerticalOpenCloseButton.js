import React from 'react';
import PropTypes from 'prop-types';
// import classNames from "classnames";

const VerticalOpenCloseButton = ({ isOpening, onClick }) =>
// let btnClass = classNames({
//   [btn]: true,
//   [open]: isOpening,
//   [close]: !isOpening
// });
  <button onClick={() => onClick()} />;
VerticalOpenCloseButton.propTypes = {
  isOpening: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default VerticalOpenCloseButton;
