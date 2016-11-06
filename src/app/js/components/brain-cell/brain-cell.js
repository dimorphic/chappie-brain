// deps
import Vue from 'vue/dist/vue';

Vue.component('braincell', {
  props: [
    'body',
    'size',
    'fill'
  ],

  template: `<li class="Braincell" v-bind:style="getCellStyle">{{body}}</li>`,

  computed: {
    getCellStyle: function getCellStyle() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        fontSize: (this.size * 0.5),

        color: this.fill.textColor || '',
        backgroundColor: this.fill.bgColor || ''
      };
    }
  }
});
