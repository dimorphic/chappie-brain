// deps
import { enableDebugTools, ELEMENT_PROBE_PROVIDERS } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

// Environment Providers
var PROVIDERS = [];

if ('production' === ENV) {
  // disable debug tools
  enableProdMode();
} else {
  // Development
  require('scss/main.scss');

  // enable debug tools
  // enableDebugTools();

  PROVIDERS = [
    ...PROVIDERS,
    ELEMENT_PROBE_PROVIDERS
  ];

}

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
