import React from 'react';
import DataSourceSlider from './DataSourceSlider';

const index = {
  filename: '/Users/laurent/cernbox/o2muon/dpl-digits.bin',
  format: 'dplsink',
  index: [
    { start: 144, end: 3216 },
    { start: 3360, end: 402080 },
    { start: 402224, end: 504720 },
    { start: 504864, end: 544128 },
    { start: 544272, end: 772944 },
    { start: 6972448, end: 7070656 },
    { start: 7070800, end: 7212336 },
    { start: 544272, end: 772944 },
    { start: 6972448, end: 7070656 },
    { start: 7070800, end: 7212336 },
    { start: 144, end: 3216 },
    { start: 3360, end: 402080 },
    { start: 402224, end: 504720 },
    { start: 504864, end: 544128 },
    { start: 544272, end: 772944 },
    { start: 6972448, end: 7070656 },
    { start: 7070800, end: 7212336 },
    { start: 544272, end: 772944 },
    { start: 6972448, end: 7070656 },
    { start: 7070800, end: 7212336 },
    { start: 144, end: 3216 },
    { start: 3360, end: 402080 },
    { start: 402224, end: 504720 },
    { start: 504864, end: 544128 },
    { start: 544272, end: 772944 },
    { start: 6972448, end: 7070656 },
    { start: 7070800, end: 7212336 },
    { start: 544272, end: 772944 },
    { start: 6972448, end: 7070656 },
    { start: 7070800, end: 7212336 },
  ],
  elemsize: 32,
};

export default {
  component: 'DataSourceSlider',
  title: 'DataSource/SliderSelector',
};

export const Digits = () => <DataSourceSlider index={index} />;
