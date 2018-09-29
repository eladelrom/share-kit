import React from 'react'
import {storiesOf} from '@storybook/react'

import {RequestQRCode, Action} from '../index'
import {Manager} from './Manager'

const defaultData = {
  action: Action.attestation,
  token: 'a08714b92346a1bba4262ed575d23de3ff3e6b5480ad0e1c82c011bab0411fdf',
  url: 'bloom.co',
  org_logo_url: 'bloom.co/images/bloom-logo.png',
  org_name: 'Bloom',
  types: {phone: 1, payroll: 1},
}

storiesOf('RequestQRCode', module)
  .add('Default', () => <RequestQRCode requestData={defaultData} />)
  .add('Colors', () => <RequestQRCode requestData={defaultData} bgColor={'#EBF0F1'} fgColor={'#3C3C3D'} />)
  .add('Size', () => <RequestQRCode requestData={defaultData} size={300} />)
  .add('Canvas', () => <RequestQRCode requestData={defaultData} renderAs="canvas" />)
  .add('Managed', () => <Manager requestData={defaultData} />)