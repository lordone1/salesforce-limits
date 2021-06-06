import "@patternfly/react-core/dist/styles/base.css";
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { SalesforceLimitsApp } from './components/SalesforceLimitsApp';
import Sf from './helpers/sf';

Sf.init()
  .then(() => {
    ReactDOM.render(
      <SalesforceLimitsApp />,
      document.getElementById('root')
    )
  }).catch((e) => {
    ReactDOM.render(
      <SalesforceLimitsApp error={e}/>,
      document.getElementById('root')
    )
  });