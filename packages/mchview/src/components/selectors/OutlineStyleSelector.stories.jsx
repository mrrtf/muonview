import React from "react";
import OutlineStyleSelector from "./OutlineStyleSelector";

export default {
  component: OutlineStyleSelector,
  title: "Outline/StyleSelector",
  // decorators: [storyFn => <div style={{ padding: "10px" }}>{storyFn()}</div>]
};

export const Regular = () => (
  <OutlineStyleSelector value={42} onChange={() => {}} />
);
