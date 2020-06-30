/* eslint no-use-before-define: ["error", { "variables": false }] */
import { isEmpty, isEqual } from 'lodash';
import listOfValidDeIds from './listOfValidDeIds';

// constants
const chamber = { name: 'Chamber', key: 'chamber' };

const de = {
  name: 'Detection Element',
  key: 'de',
};
const deplane = {
  name: 'Plane',
  key: 'deplane',
};
const ds = {
  name: 'Dual Sampa',
  key: 'ds',
};
const pad = {
  name: 'Pad',
  key: 'pad',
};
const cluster = {
  name: 'Cluster',
  key: 'cluster',
};
const area = {
  name: 'Area',
  key: 'area',
};

export const hasBending = (id) => id.bending != null && Object.prototype.hasOwnProperty.call(id, 'bending');

export const isValidCategory = (c) => isEqual(c, de)
  || isEqual(c, ds)
  || isEqual(c, deplane)
  || isEqual(c, chamber)
  || isEqual(c, cluster)
  || isEqual(c, area);

export const whatis = (id) => {
  if (id == null) {
    return null;
  }
  if (isEmpty(id)) {
    return null;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, 'clusterid')
    && Object.prototype.hasOwnProperty.call(id, 'deid')
  ) {
    return cluster;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, 'deid')
    && Object.prototype.hasOwnProperty.call(id, 'padid')
  ) {
    return pad;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, 'deid')
    && Object.prototype.hasOwnProperty.call(id, 'dsid')
    && Object.prototype.hasOwnProperty.call(id, 'dsch')
  ) {
    return pad;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, 'deid')
    && Object.prototype.hasOwnProperty.call(id, 'dsid')
  ) {
    return ds;
  }
  if (
    Object.prototype.hasOwnProperty.call(id, 'bending')
    && Object.prototype.hasOwnProperty.call(id, 'deid')
  ) {
    return deplane;
  }
  if (Object.prototype.hasOwnProperty.call(id, 'deid')) {
    return de;
  }
  if (Object.prototype.hasOwnProperty.call(id, 'chid')) {
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
      if (Object.prototype.hasOwnProperty.call(id, 'padid')) {
        return id.padid !== null;
      }
      return id.dsch !== null;
    case cluster:
      return id.clusteri !== null;
    default:
      throw new Error(
        `isSpecific not implemented for id=${JSON.stringify(id)} of category ${
          w.name
        }`,
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
      if (Object.prototype.hasOwnProperty.call(id, 'bending')) {
        p = { deid: id.deid, bending: id.bending };
      }
      if (Object.prototype.hasOwnProperty.call(id, 'dsid')) {
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
          id,
        )} of category ${w.name}`,
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
    if (Object.prototype.hasOwnProperty.call(id, 'padid')) {
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
    return '';
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
        id.bending === 'true' || id.bending === true ? 'Bending' : 'Non-Bending'
      } ${w.name}`;
    case ds: {
      return `${describeId(parent(id))} ${w.name} ${id.dsid}`;
    }
    case pad: {
      if (Object.prototype.hasOwnProperty.call(id, 'padid')) {
        return `${describeId(parent(id))} PadId ${id.padid}`;
      }
      return `${describeId(parent(id))} Channel ${id.dsch}`;
    }
    case cluster: {
      return `${describeId(parent(id))} ${w.name} ${id.clusterid}`;
    }
    default:
      throw new Error('not implemented');
  }
};

export const nameAll = (id) => {
  const w = whatis(id);
  if (w == null) {
    return '';
  }
  let rv = '';

  const p = parent(id);
  if (isSpecific(p)) {
    rv = describeId(p);
  }
  if (rv !== '') {
    rv += ' ';
  }

  rv += `All ${whatis(id).name}s`;
  return rv;
};

const nameInvalid = (w) => `invalid${w.name}`;

export const encode = (id) => describeId(id).toLowerCase().replace(/ /g, '-');

/* Return { deid:X, dsid: Y, dsch: Z } for id="X-Y-Z"
 */
export const decode = (s) => {
  const a = s.split('-');
  const id = {
    deid: Number(a[0]),
    dsid: Number(a[1]),
    dsch: Number(a[2]),
  };
  return id;
};

export {
  de, deplane, chamber, area, cluster, ds, pad,
};
export const all = [de, deplane, chamber, area, cluster, ds, pad];
