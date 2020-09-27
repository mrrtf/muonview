import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Digits from "./Digits";

const deDigits = (state, deid) =>
  state.data.digits.pads.filter((x) => x.deid === deid);

const DigitLayer = ({ id }) => {
  // FIXME: should get the digits as props instead ?
  const digits = useSelector((state) => deDigits(state, id.deid));
  return (
    <>
      <Digits bending={id.bending} pads={digits} />
      <Digits bending={!id.bending} pads={digits} />
    </>
  );
};
DigitLayer.propTypes = {
  id: PropTypes.shape({
    deid: PropTypes.number,
    bending: PropTypes.bool,
  }).isRequired,
};

export default DigitLayer;
