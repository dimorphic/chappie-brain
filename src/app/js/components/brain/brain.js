// deps
import Vue from 'vue/dist/vue';

import Memory from '../../models/memory';
import statsMeter from '../../common/stats';

// components
import '../brain-cell';

// settings
const SETTINGS = {
  // play with this!
  alive: 1, // brain is 'alive' (randomize memory activity) ?
  updateMode: 1,	// 0 - full memory / 1 - single memory

  // animation settings
  useRAF: true,		// steroids mode on?
  updateDelay: 400	// ignored if RAF true, slowpoke
};

Vue.component('brain', {
  template: `
    <div>
      <div class="debug">
        cells: {{cellsCounter}}
        <br />
        draw #{{redrawCounter}}
      </div>

      <ul>
        <braincell
          v-for="(cell, idx) in memory.cells"
          :key="cell.id"

          :size="cell.size"
          :body="cell.body"
          :fill="cell.fill"
        >
        </braincell>
      </ul>
    </div>
  `,

  data: () => {
    return {
      running: false,
      cellsCounter: 0,
      redrawCounter: 0,

      benchmark: true,
      stats: { fps: null, ms: null, mb: null },

      memory: null
    };
  },

  computed: {
    cellsCounter: function cellsCounter() {
      return this.memory.cells.length;
    }
  },

  beforeMount: function onBeforeMount() {
    // create memory
    this.memory = new Memory();

    // create meters
    if (this.benchmark) {
      this.stats.fps = statsMeter('fps', { top: 0, left: 0 });
      this.stats.ms = statsMeter('ms', { top: 0, left: 80 });
    }

    window.addEventListener('resize', this.handleWindowResize);
  },

  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  },

  // LIFECYCLE HOOKS
  mounted: function onMount() {
    console.log('[BRAIN] BOOTING...');

    // start animation
    if (SETTINGS.useRAF) {
      console.log('[BRAIN] Use RAF! Steroids BABY!');
      this.currentFrameTracker = requestAnimationFrame(() => this.redraw());
    } else {
      console.log('[BRAIN] Slow poke...');
      this.currentFrameTracker = setInterval(() => this.redraw(), SETTINGS.updateDelay);
    }

    this.running = true;

    // randomize memory activity
    if (SETTINGS.alive) {
      setInterval(() => {
        console.log('regen noise!');
        this.memory.generateNoise();
      }, 6000);
    }
  },

  methods: {
    handleWindowResize() {
      // reboot memory
      this.memory.boot();
    },

    update() {
      // memory update
      this.memory.update();

      // update draw counter
      this.redrawCounter++;
    },

    redraw: function redraw() {
      const { benchmark, stats } = this;

      // benchmark stats start
      if (benchmark) {
        stats.fps.begin();
        stats.ms.begin();
      }

      // update memory and counter
      this.update();

      // benchmark stats end
      if (benchmark) {
        stats.fps.end();
        stats.ms.end();
      }

      // request another frame ?
      if (this.running && SETTINGS.useRAF) {
        this.currentFrameTracker = requestAnimationFrame(() => this.redraw());
      }
    }
  }
});
