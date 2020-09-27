import React from "react";
import VisibilitySelectorBar from "./VisibilitySelectorBar";

export default {
  component: "VisibilitySelectorBar",
  title: "Selector/VisibilityBar",
};

export const Elements = () => {
  const elements = {
    "I am visible ": true,
    "I am the invisible man": false,
    "not visible either": false,
    "I shine": true,
  };

  return <VisibilitySelectorBar elements={elements} />;
};
