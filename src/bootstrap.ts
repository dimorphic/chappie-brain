import { provide } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';

import {ENV_PROVIDERS} from './environment/environment';

import App from './app/app';

export function main(initialHmrState?: any): Promise<any> {
  return bootstrap(App, [
    provide(APP_BASE_HREF, {useValue: '/'}),
    ROUTER_PROVIDERS,
    ...ENV_PROVIDERS
  ])
  .catch(err => console.error(err));
}

if ('development' === ENV && HMR === true) {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
