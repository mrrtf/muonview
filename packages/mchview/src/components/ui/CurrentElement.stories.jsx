import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from "@storybook/addon-actions";

import { PureCurrentElement } from './CurrentElement';

storiesOf('CurrentElement', module)
  .addDecorator((story) => <div style={{ padding: '10px' }}>{story()}</div>)
  .add('de (invalid)', () => <PureCurrentElement id={{ deid: null }} />)
  .add('de', () => <PureCurrentElement id={{ deid: 501 }} />)
  .add('de (with data)', () => (
    <PureCurrentElement id={{ deid: 501 }} value={1234.42} />
  ))
  .add('deplane', () => (
    <PureCurrentElement id={{ deid: 501, bending: true }} />
  ))
  .add('ds', () => (
    <PureCurrentElement id={{ deid: null, bending: null, dsid: null }} />
  ))
  .add('nothing', () => <PureCurrentElement />);
