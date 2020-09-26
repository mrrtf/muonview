import React from "react";
import DataSourceSlider from "./DataSourceSlider";

export default {
  component: "DataSourceSlider",
  title: "DataSource/SliderSelector",
};

const createItems = (nevents, maxPerEvent, prob) => {
  const items = [];
  for (let i = 0; i < nevents; i += 1) {
    items.push({
      isLoaded: Math.random() > prob,
      size: Math.floor(Math.random() * maxPerEvent),
    });
  }
  return items;
};

export const DigitsHalfLoaded = () => (
  <DataSourceSlider
    name="/Users/laurent/cernbox/o2muon/dpl-digits.bin"
    items={createItems(20, 150, 0.5)}
    description="dplsink"
    kind="digits"
  />
);

export const DigitsAllLoaded = () => (
  <DataSourceSlider
    name="/Users/laurent/cernbox/o2muon/dpl-digits.bin"
    items={createItems(20, 150, 0)}
    description="dplsink"
    kind="digits"
  />
);

export const DigitsNoneLoaded = () => (
  <DataSourceSlider
    name="/Users/laurent/cernbox/o2muon/dpl-digits.bin"
    items={createItems(931, 25000, 1)}
    description="dplsink"
    kind="digits"
  />
);
