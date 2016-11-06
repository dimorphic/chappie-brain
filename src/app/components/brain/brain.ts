// deps
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import stats from 'app/helpers/stats';

// components
import BrainCell from 'app/components/brain-cell';

// services
import Memory from 'app/services/memory';
import CounterService from 'app/services/counter';

// styles
import './brain.scss';

@Component({
  selector: 'brain',
  directives: [ BrainCell ],
  template: require('./brain.html'),
  providers: [
    CounterService
    // Memory
  ],
})
export default class Brain implements OnInit, OnDestroy {
  private memory: any = {};
  private benchmark: boolean = true;

  private running: boolean = false;
  private currentFrameTracker: any;
  private performance: any = { fps: null, ms: null, mb: null };

  static config = {
    // play with this!
    alive: 1, // brain is 'alive' (randomize memory activity) ?
    updateMode: 0,		// 0 - full memory
    				          // 1 - single memory

    // animation settings
    useRAF: true,		// steroids mode on?
    updateDelay: 400,	// ignored if RAF true, slowpoke
  };

  // @TODO
  constructor(private redrawCounter: CounterService) {
    // create memory
    this.memory = new Memory({
      updateMode: Brain.config.updateMode
    });

    // create meters
    if (this.benchmark) {
      this.performance.fps = stats.createMeter('fps', { top: 0, left: 0 });
      this.performance.ms = stats.createMeter('ms', { top: 0, left: 80 });
    }
  }

  ngOnInit() {
    console.log('[BRAIN] BOOTING...');

    this.running = true;

    // start animation
		if (Brain.config.useRAF) {
      console.log('[BRAIN] Use RAF! Steroids BABY!');
			this.currentFrameTracker = requestAnimationFrame(() => this.redraw());
		} else {
      console.log('[BRAIN] Slow poke...');
			this.currentFrameTracker = setInterval(() => this.redraw(), Brain.config.updateDelay);
    }

    // randomize memory activity
		if (Brain.config.alive) {
			setInterval(() => {
				this.memory.generateNoise();
			}, 6000);
		}
  }

  ngOnDestroy() {
    console.log('[BRAIN] Bye bye...');
    this.running = false; // @TODO
  }

  getDrawCount(): number {
    return this.redrawCounter.getCount();
  }

  onResize(event: any) {
    // reboot memory
    this.memory.boot();
  }

  update() {
    // memory update
    this.memory.update();

    // update draw counter
    this.redrawCounter.inc();
  }

  redraw() {
    const { benchmark, performance } = this;

    // benchmark stats start
    if (benchmark) {
      performance.fps.begin();
      performance.ms.begin();
    }

    // update memory and counter
    this.update();

    // benchmark stats end
    if (benchmark) {
      performance.fps.end();
      performance.ms.end();
    }

    // request another frame ?
    if (this.running && Brain.config.useRAF) {
      this.currentFrameTracker = requestAnimationFrame(() => this.redraw());
    }
  }
}
