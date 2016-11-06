// deps
import $ from 'jquery'; // ffs
import Vue from 'vue/dist/vue';

import './components/brain';

// show them stats!
// const BENCHMARK = true;

$(() => {
  console.log('!!!');
  // const app = new Brain('#app');

  const app = new Vue({
    el: '#app'
  });
});
