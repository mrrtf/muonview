import React, { useState } from "react";
import DePlaneSelector from "./DePlaneSelector";

export default {
  component: DePlaneSelector,
  title: "DePlane/Selector",
};

export const InvalidDeId = () => (
  <DePlaneSelector id={{ deid: 1, bending: false }} setId={() => {}} />
);

export const Bending100 = () => {
  const [id, setId] = useState({ deid: 100, bending: true });
  return <DePlaneSelector id={id} setId={setId} />;
};

export const NonBending1025 = () => {
  const [id, setId] = useState({ deid: 1025, bending: false });
  return <DePlaneSelector id={id} setId={setId} />;
};
