// deps
import { Component } from '@angular/core';
import { RouteConfig, Router, RouterOutlet } from '@angular/router-deprecated';

// routes
import { ROUTES } from './routes';

// components (top level)

// main project style
import 'assets/scss/main.scss';

@Component({
  selector: 'app',
  directives: [
    RouterOutlet,
  ],
  template: require('./pages/layout.html'),
})
@RouteConfig(ROUTES)
export default class App {
  constructor() {}
}
