// deps
import { Component } from '@angular/core';

// components
import Brain from 'app/components/brain';
// import Braincell from 'app/components/brain-cell';

// styles
import './index.page.scss';

@Component({
  selector: 'index-page',
  directives: [ Brain ],
  providers: [],
  template: require('./index.page.html'),
})
export default class IndexPage {
  constructor() {

  }
}
