import React from "react";
import PropTypes from "prop-types";
import SVGGroup from "./SVGGroup";
import { decode } from "../../categories";
import Pad from "./Pad";

const Digits = ({
  pads,
  bending,
  outlineStyle = {
    stroke: bending ? "green" : "blue",
    strokeWidth: 0.2,
  },
}) => {
  const poly = pads.map((x) => {
    const id = decode(x.id);
    const { dsid } = id;
    if (
      (bending === true && dsid < 1024) ||
      (bending === false && dsid >= 1024)
    ) {
      return <Pad key={x.id} id={id} vertices={x.vertices} />;
    }
    return null;
  });

  return (
    <>
      <SVGGroup groupname="digits" style={outlineStyle}>
        {poly}
      </SVGGroup>
    </>
  );
};

Digits.propTypes = {
  pads: PropTypes.array,
  outlineStyle: PropTypes.object,
  bending: PropTypes.bool,
};

export default Digits;
