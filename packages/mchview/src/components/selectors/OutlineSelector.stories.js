import React from 'react';
import OutlineSelector from './OutlineSelector';

export default {
  component: 'OutlineSelector',
  title: 'Outline/Selector',
};

export const Elements = () => {
  const elements = [];

  elements.push({
    name: 'visible and available',
    visible: true,
    available: true,
  });
  elements.push({
    name: 'not visible but available',
    visible: false,
    available: true,
  });
  elements.push({
    name: 'not visible not available',
    visible: false,
    available: false,
  });
  elements.push({
    name: 'visible not available',
    visible: true,
    available: false,
  });

  return <OutlineSelector elements={elements} />;
};
