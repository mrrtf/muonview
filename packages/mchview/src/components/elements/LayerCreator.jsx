import React from "react";
import EnvelopLayer from "./EnvelopLayer";
import DePlane from "./DePlane";
import DualSampas from "./DualSampas";
import DigitLayer from "./DigitLayer";
import { deplane, ds, pad, describeId, convertId } from "../../categories";

const createLayer = (layer, id, outlineStyle) => {
  const cid = convertId(id, layer);
  if (!cid) {
    return null;
  }
  const key = describeId(cid);
  switch (layer) {
    case deplane:
      return (
        <EnvelopLayer
          key={key}
          id={cid}
          outlineStyle={outlineStyle}
          component={DePlane}
        />
      );
    case ds:
      return (
        <EnvelopLayer
          key={key}
          id={cid}
          outlineStyle={outlineStyle}
          component={DualSampas}
        />
      );
    case pad:
      return <DigitLayer key={key} id={id} />;
    default:
      return null;
  }
};
export default createLayer;
