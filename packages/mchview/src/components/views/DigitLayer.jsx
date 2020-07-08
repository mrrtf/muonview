import React from 'react';
import { useSelector } from 'react-redux';
import Digits from '../elements/Digits';

const DigitLayer = ({ id }) => {
  // FIXME: should get the digits as props instead ?
  const digits = useSelector((state) => state.data.digits);
  return (
    <>
      <Digits
        bending={id.bending}
        pads={digits.pads.filter((x) => x.deid === id.deid)}
      />
      <Digits
        bending={!id.bending}
        pads={digits.pads.filter((x) => x.deid === id.deid)}
      />
    </>
  );
};

export default DigitLayer;
