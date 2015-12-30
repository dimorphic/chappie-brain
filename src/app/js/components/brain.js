// deps
import Memory from '../models/memory';
import helpers from '../common/helpers';

// @DEBUG: do you even lift bro?
import stats from '../common/stats';

//
//  Brain component
//
class Brain {
    constructor(element, debug) {
        if (!element) {
            throw new Error('Need DOM element to mount, bro!');
        }

        // DOM element and canvas 'pointers'
        this.element = element;
        this.canvas = null;

        // debug / benchmark flag
        this.debug = debug || false;
        this.benchmark = {};

        // cell memory
        this.memory = null;
        this.busy = false;

        // options. play with this!
        this.animation = {
            alive: true, // brain is 'alive' (randomize memory activity) ?
            updateMode: 0, // 0 - full memory / 1 - single memory

            // animation settings
            useRAF: true, // steroids mode on?
            updateDelay: 1000, // ignored if RAF true, slowpoke

            // trackers
            updateTimer: null	// update timer (raf / interval)
        };

        // init
        // this.boot(element);
    }

    //
    //	Brain boot
    //
    boot() {
        console.log('[Brain] Booting @ ' + this.element + ' ...');

        // @DEBUG: create stats meters
        if (this.debug) {
            this.benchmark = this.createStatsMeters();
        }

        // setup & attach to canvas
        this.attach(this.element);

        // create new Memory
        this.memory = new Memory({ updateMode: this.animation.updateMode });

        // go animate / dream
        this.animate();
    }

    //
    //	Brain attach handler
    //
    attach(el) {
        const cvs = document.querySelector(el);

        if (!cvs || !cvs.getContext) {
            throw new Error('Need a canvas element bro!');
        }

        // set canvas to full window size
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;

        // set pointers
        this.canvas = cvs;
        this.ctx = cvs.getContext('2d');

        // set composite operation
        // this.ctx.globalCompositeOperation = 'lighter';

        // handle window resize
        window.addEventListener('resize', this.onScreenResize.bind(this));
    }

    //
    //  Brain debug / benchmark stats meters
    //
    createStatsMeters() {
        console.log('[Brain] Creating stats meters!');

        const meters = {};
        meters.fps = stats('fps', { top: 0, left: 0 }); // wtf is dis ?
        meters.ms = stats('ms', { top: 0, left: 80 }); // and this?
        // meters.mb = stats('mb', { top: 0, left: 160 });

        return meters;
    }

    //
    //	Brain screen resize handler
    //
    onScreenResize() {
        console.log('[Brain] screen resize!', this.memory.grid.maxCells);

        // reboot memory
        this.memory.boot();

        // reset canvas to full window size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    //
    //	Brain animate helper
    //
    animate() {
        // console.log('[Brain] Dreaming ', this.memory.cells.length, ' cells...');

        // start animation
        if (this.animation.useRAF) {
            this.animation.updateTimer = window.requestAnimFrame(this.render.bind(this));
        } else {
            this.animation.updateTimer = setInterval(this.render, this.animation.updateDelay);
        }

        // randomize memory activity
        if (this.animation.alive) {
            setInterval(() => {
                this.think();
            }, 5000);
        }
    }

    //
    //	Brain translate term to number helper
    //
    translate(term) {
        return helpers.toNumbers(term); // @TODO: refactor to own 'encode' module ?
    }

    //
    //	Brain interpret user term / query
    //
    interpret(term) {
        // translate term to number seed
        const translation = this.translate(term);

        // think / dream it
        this.think(translation);
    }

    //
    //	Brain think / dream helper
    //
    think(seed) {
        if (!this.animation.alive && !seed) {
            return void 0;
        }

        // set busy flag, we're transitioning to a new memory
        this.busy = true;

        // get new memory noise map
        this.memory.generateNoise(seed);

        // set timeout to remove busy flag
        // ...and restore context alpha
        setTimeout(() => {
            this.busy = false;
            this.ctx.globalAlpha = 1;
        }, 1000);
    }

    //
    //	Brain paint GRID debug helper (#TODO: remove?)
    //
    paintGrid() {
        // draw vertical lines
        for (let x = 0.5; x < this.canvas.width; x += this.memory.cellSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }

        // draw horizontal lines
        for (let y = 0.5; y < this.canvas.height; y += this.memory.cellSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }

        // paint grid
        this.ctx.strokeStyle = '#444';
        this.ctx.stroke();
    }

    //
    //	Brain paint cells count helper
    //
    paintCounter() {
        this.ctx.font = '14px Exo';
        this.ctx.textBaseline = 'middle';

        const textCells = this.memory.cells.length;
        const textSize = this.ctx.measureText(textCells);
        const textX = (this.canvas.width - textSize.width) - 20;
        const textY = (this.canvas.height - textSize.width) - 20;

        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(textCells, textX, textY);
    }

    //
    //	Brain paint brain cell count helper
    //
    paintCell(cell) {
        // if (~~(Math.random() * 2)) {
        if (this.busy) {
            this.ctx.globalAlpha = Math.random().toFixed(2);
        }

        // start new path
        this.ctx.beginPath();

        // set color and draw rect
        this.ctx.fillStyle = cell.fill.bgColor;
        this.ctx.fillRect(cell.x, cell.y, cell.size, cell.size);

        // draw text
        this.ctx.font = '14px Exo';
        this.ctx.textBaseline = 'middle';

        const textX = cell.x + (cell.size / 2) - (this.ctx.measureText(cell.body).width / 2);
        const textY = cell.y + (cell.size / 2);

        this.ctx.fillStyle = cell.fill.textColor;
        this.ctx.fillText(cell.body, textX, textY);
    }

    //
    //	Brain update handler
    //
    update() {
        // console.log('[Brain] Updating memory...');

        // update memory
        this.memory.update();
    }

    //
    //	Brain draw handler
    //
    draw() {
        // console.log('[Brain] Draw memory...');

        // clear canvas
        // if (!this.busy) {
            // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // }

        // draw brain cells / memory
        for (let idx = 0; idx < (this.memory.cells.length / 3); idx++) {
            const randomCell = ~~(Math.random() * this.memory.cells.length);
            this.paintCell(this.memory.cells[randomCell]);
        }

        // draw cell stats
        this.paintCounter();
    }

    //
    //	Brain render handler
    //
    render() {
        // console.log('[Brain] Render...', this.animation);

        // request another frame?
        if (this.animation.useRAF) {
            this.animation.updateTimer = window.requestAnimFrame(this.render.bind(this));
        }

        // @TODO: refactor stats module
        // benchmark start
        if (this.debug) {
            this.benchmarkBegin();
        }

        // update
        this.update();

        // draw
        this.draw();

        // benchmark end
        if (this.debug) {
            this.benchmarkEnd();
        }
    }

    //
    //  Brain benchmark helpers
    //
    benchmarkBegin() {
        const { fps, ms } = this.benchmark;

        fps.begin();
        ms.begin();
    }

    benchmarkEnd() {
        const { fps, ms } = this.benchmark;

        fps.end();
        ms.end();
    }

}

export default Brain;
