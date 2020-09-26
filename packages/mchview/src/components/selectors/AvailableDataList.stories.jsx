import React from "react";
import AvailableDataList from "./AvailableDataList";

const availableFiles = [
  {
    id: 1,
    filename: "/Users/laurent/cernbox/o2muon/dpl-digits.bin",
    format: "dplsink",
    kind: "digits",
    sha256: "33106022e64a712ec3b5eb8becb7e81c8c0a3196",
    indexSize: 931,
  },
  {
    id: 2,
    filename: "/Users/laurent/cernbox/o2muon/digits.v2.in",
    format: "mchbin",
    kind: "digits",
    sha256: "9a84440af8532d95784a70394703a85cdbcd19ac",
    indexSize: 931,
  },
];

export default {
  component: "AvailableDataList",
  title: "DataSource/AvailableDataList",
};

export const Digits = () => <AvailableDataList dataList={availableFiles} />;
