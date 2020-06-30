import React, { useState } from 'react';
import OutlineSelectorButton from './OutlineSelectorButton';

const onChangeDefault = () => {};

export default {
  component: OutlineSelectorButton,
  title: 'Outline/SelectorButton',
  decorators: [
    (storyFn) => (
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        {storyFn()}
      </div>
    ),
  ],
};

export const UncheckedDisabled = () => (
  <OutlineSelectorButton
    label="An unchecked button"
    value={false}
    onChange={onChangeDefault}
    disabled
  />
);

const label = (value) => `A ${value ? 'checked' : 'unchecked'}  button`;

export const Unchecked = () => {
  const [value, setValue] = useState(false);

  return (
    <OutlineSelectorButton
      label={label(value)}
      value={value}
      onChange={(event) => {
        setValue(event.target.checked);
      }}
    />
  );
};

export const Checked = () => {
  const [value, setValue] = useState(true);
  return (
    <OutlineSelectorButton
      label={label(value)}
      value={value}
      onChange={(event) => {
        setValue(event.target.checked);
      }}
    />
  );
};

export const CheckedDisabled = () => (
  <OutlineSelectorButton
    label="A checked button"
    value
    onChange={onChangeDefault}
    disabled
  />
);
