import React from "react";
import CurrentElement from "./CurrentElement";

export default {
  component: CurrentElement,
  title: "Status/CurrentElement",
};

export const InvalidDe = () => <CurrentElement id={{ deid: null }} />;

export const De = () => <CurrentElement id={{ deid: 501 }} />;

export const DeWithData = () => (
  <CurrentElement id={{ deid: 501 }} value={1234.42} />
);

export const DePlane = () => (
  <CurrentElement id={{ deid: 501, bending: true }} />
);

export const DualSampa = () => (
  <CurrentElement id={{ deid: null, bending: null, dsid: null }} />
);

export const Nothing = () => <CurrentElement />;
