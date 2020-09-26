/* eslint no-use-before-define: ["error", { "variables": false }] */
import { isEmpty, isEqual } from "lodash";
import listOfValidDeIds from "./listOfValidDeIds";

// constants

const mch = {
  name: "Muon Tracker",
  key: "mch",
  depth: 0,
};
const station = {
  name: "Station",
  key: "station",
  depth: 1,
};
const chamber = {
  name: "Chamber",
  key: "chamber",
  depth: 2,
};
const de = {
  name: "Detection Element",
  key: "de",
  depth: 3,
};
const deplane = {
  name: "Plane",
  key: "deplane",
  depth: 4,
};
const ds = {
  name: "Dual Sampa",
  key: "ds",
  depth: 4,
};
const pad = {
  name: "Pad",
  key: "pad",
  depth: 5,
};
const cluster = {
  name: "Cluster",
  key: "cluster",
  depth: 4,
};
const area = {
  name: "Area",
  key: "area",
  depth: 4,
};

export const hasBending = (id) =>
  id.bending != null && Object.prototype.hasOwnProperty.call(id, "bending");

export const isValidCategory = (c) =>
  isEqual(c, mch) ||
  isEqual(c, station) ||
  isEqual(c, de) ||
  isEqual(c, ds) ||
  isEqual(c, chamber) ||
  isEqual(c, deplane) ||
  isEqual(c, cluster) ||
  isEqual(c, area) ||
  isEqual(c, pad);

// convert id to destination
export const convertId = (id, dest) => {
  if (whatis(id) === dest) {
    return id;
  }
  if (id.depth > dest.id) {
    return parent(id);
  }
  if (whatis(id) === deplane) {
    switch (dest) {
      case ds:
        return { deid: id.deid, bending: id.bending, dsid: null };
      case pad:
        return { deid: id.deid, padid: null };
      case cluster:
        return null;
      default:
        throw new Error(
          "don't know (yet) how to convert from",
          JSON.stringify(id),
          "to",
          JSON.stringify(dest)
        );
    }
  }
  throw new Error("don't know (yet) how to convert from", JSON.stringify(id));
};

export const whatis = (id) => {
  if (id == null) {
    return null;
  }
  if (isEmpty(id)) {
    return null;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, "clusterid") &&
    Object.prototype.hasOwnProperty.call(id, "deid")
  ) {
    return cluster;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, "deid") &&
    Object.prototype.hasOwnProperty.call(id, "padid")
  ) {
    return pad;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, "deid") &&
    Object.prototype.hasOwnProperty.call(id, "dsid") &&
    Object.prototype.hasOwnProperty.call(id, "dsch")
  ) {
    return pad;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, "deid") &&
    Object.prototype.hasOwnProperty.call(id, "dsid")
  ) {
    return ds;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, "bending") &&
    Object.prototype.hasOwnProperty.call(id, "deid")
  ) {
    return deplane;
  }
  if (Object.prototype.hasOwnProperty.call(id, "deid")) {
    return de;
  }
  if (Object.prototype.hasOwnProperty.call(id, "chid")) {
    return chamber;
  }
  return null;
};

export const isSpecific = (id) => {
  const w = whatis(id);
  if (w == null) {
    return false;
  }
  switch (w) {
    case de:
      return id.deid !== null;
    case deplane:
      return id.bending !== null;
    case ds:
      return id.dsid !== null && id.bending !== null;
    case pad:
      if (Object.prototype.hasOwnProperty.call(id, "padid")) {
        return id.padid !== null;
      }
      return id.dsch !== null;
    case cluster:
      return id.clusteri !== null;
    default:
      throw new Error(
        `isSpecific not implemented for id=${JSON.stringify(id)} of category ${
          w.name
        }`
      );
  }
};

export const isValidDeId = (deid) => {
  if (Number.isNaN(deid)) {
    return false;
  }
  return listOfValidDeIds.includes(parseInt(deid, 10));
};

/* get the parent object of id
 */

export const parent = (id) => {
  const w = whatis(id);
  switch (w) {
    case null:
      return null;
    case de:
      return null;
    case deplane:
      return { deid: id.deid };
    case ds:
      if (hasBending(id)) {
        return { deid: id.deid, bending: id.bending };
      }
      return { deid: id.deid };
    case pad: {
      let p = { deid: id.deid };
      if (Object.prototype.hasOwnProperty.call(id, "bending")) {
        p = { deid: id.deid, bending: id.bending };
      }
      if (Object.prototype.hasOwnProperty.call(id, "dsid")) {
        p = { deid: id.deid, dsid: id.dsid };
      }
      return p;
    }
    case cluster: {
      return { deid: id.deid };
    }
    default:
      throw new Error(
        `parent(id) must be implemented for id=${JSON.stringify(
          id
        )} of category ${w.name}`
      );
  }
};

export const isValid = (id) => {
  // TODO: get the real values from the mapping API at startup instead
  const w = whatis(id);
  if (w === de) {
    return isValidDeId(id.deid);
  }
  if (w === deplane) {
    return isValid(parent(id)) && id.bending !== null;
  }
  if (w === ds) {
    return isValid(parent(id)) && !(Number.isNaN(id.dsid) || id.dsid === null);
  }
  if (w === pad) {
    if (Object.prototype.hasOwnProperty.call(id, "padid")) {
      return isValid(parent(id)) && !Number.isNaN(id.padid);
    }
    return isValid(parent(id)) && !Number.isNaN(id.dsch);
  }
  if (w === cluster) {
    return true;
  }
  return false;
};

export const describeId = (id) => {
  const w = whatis(id);
  if (w == null) {
    return "";
  }
  if (!isSpecific(id)) {
    return nameAll(id);
  }
  if (!isValid(id)) {
    return nameInvalid(id);
  }
  switch (w) {
    case de:
      return `${w.name} ${id.deid}`;
    case deplane:
      return `${describeId(parent(id))} ${
        id.bending === "true" || id.bending === true ? "Bending" : "Non-Bending"
      } ${w.name}`;
    case ds: {
      return `${describeId(parent(id))} ${w.name} ${id.dsid}`;
    }
    case pad: {
      if (Object.prototype.hasOwnProperty.call(id, "padid")) {
        return `${describeId(parent(id))} PadId ${id.padid}`;
      }
      return `${describeId(parent(id))} Channel ${id.dsch}`;
    }
    case cluster: {
      return `${describeId(parent(id))} ${w.name} ${id.clusterid}`;
    }
    default:
      throw new Error("not implemented");
  }
};

export const nameAll = (id) => {
  const w = whatis(id);
  if (w == null) {
    return "";
  }
  let rv = "";

  const p = parent(id);
  if (isSpecific(p)) {
    rv = describeId(p);
  }
  if (rv !== "") {
    rv += " ";
  }

  rv += `All ${whatis(id).name}s`;
  return rv;
};

const nameInvalid = (w) => `invalid${w.name}`;

export const encode = (id) => describeId(id).toLowerCase().replace(/ /g, "-");

/* Return { deid:X, dsid: Y, dsch: Z } for id="X-Y-Z"
 */
export const decode = (s) => {
  const a = s.split("-");
  const id = {
    deid: Number(a[0]),
    dsid: Number(a[1]),
    dsch: Number(a[2]),
  };
  return id;
};

export { de, deplane, chamber, area, cluster, ds, pad };
export const all = [de, deplane, chamber, area, cluster, ds, pad];
