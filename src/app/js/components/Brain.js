define(function(require){
	'use strict';

	// deps
	var helpers = require('common/helpers');
	var stats = require('common/stats');

	// model
	var Memory = require('models/Memory');

	// #DEBUG: do you even lift, bro?
	var benchmark = true;

	// performance stats meters
	var fpsMeter, msMeter, mbMeter = null;

	if (benchmark) {
		fpsMeter = stats.createMeter('fps', { top: 0, left: 0 });
		msMeter = stats.createMeter('ms', { top: 0, left: 80 });
		// mbMeter = stats.createMeter('mb', { top: 0, left: 160 });
	}

	//
	//	Brain
	//
	var Brain = function(element) {
		this.canvas = null;
		this.memory = null;

		this.cells = [];
		this.busy = false;

		// options. play with this!
		this.animation = {
			alive: true, // brain is 'alive' (randomize memory activity) ?
			updateMode: 0,		// 0 - full memory
								// 1 - single memory

			// animation settings
			useRAF: true,		// steroids mode on?
			updateDelay: 1000,	// ignored if RAF true, slowpoke

			// trackers
			updateTimer: null	// update timer (raf / interval)
		};

		// init
		this.boot(element);
	};

	//
	//	Brain boot
	//
	Brain.prototype.boot = function(element) {
		console.log('[Brain] Booting @ ' + element + ' ...');

		// setup & attach to canvas
		this.attach(element);

		// create new Memory
		this.memory = new Memory({ updateMode: this.animation.updateMode });

		// go animate / dream
		this.animate();
	};

	//
	//	Brain attach handler
	//
	Brain.prototype.attach = function(el) {
		var cvs = document.querySelector(el);

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
	};

	//
	//	Brain screen resize handler
	//
	Brain.prototype.onScreenResize = function() {
		console.log('[Brain] screen resize!', this.memory.grid.maxCells);

		// reboot memory
		this.memory.boot();

		// reset canvas to full window size
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	};

	//
	//	Brain animate helper
	//
	Brain.prototype.animate = function() {
		// console.log('[Brain] Dreaming ', this.memory.cells.length, ' cells...');

		// start animation
		if (this.animation.useRAF) {
			this.animation.updateTimer = window.requestAnimFrame(this.render.bind(this));
		} else {
			this.animation.updateTimer = setInterval(this.render, this.animation.updateDelay);
		}

		// randomize memory activity
		if (this.animation.alive) {
			setInterval(function() {
				this.think();
			}.bind(this), 5000);
		}
	};

	//
	//	Brain translate term to number helper
	//
	Brain.prototype.translate = function(term) {
		return helpers.toNumbers(term);
	};

	//
	//	Brain interpret user term / query
	//
	Brain.prototype.interpret = function(term) {
		// translate term to number seed
		var translation = this.translate(term);

		// think / dream it
		this.think(translation);
	};

	//
	//	Brain think / dream helper
	//
	Brain.prototype.think = function(seed) {
		if (!this.animation.alive && !seed) {
			return void 0;
		}

		// set busy flag, we're transitioning to a new memory
		this.busy = true;

		// get new memory noise map
		this.memory.generateNoise(seed);

		// set timeout to remove busy flag
		// ...and restore context alpha
		setTimeout(function() {
			this.busy = false;
			this.ctx.globalAlpha = 1;
		}.bind(this), 1000);
	};

	//
	//	Brain paint GRID debug helper (#TODO: remove?)
	//
	Brain.prototype.paintGrid = function() {
		// draw vertical lines
		for (var x = 0.5; x < this.canvas.width; x += this.memory.cellSize) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.canvas.height);
		}

		// draw horizontal lines
		for (var y = 0.5; y < this.canvas.height; y += this.memory.cellSize) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.canvas.width, y);
		}

		// paint grid
		this.ctx.strokeStyle = '#444';
		this.ctx.stroke();
	};

	//
	//	Brain paint cells count helper
	//
	Brain.prototype.paintCounter = function() {
		this.ctx.font = '14px Exo';
		this.ctx.textBaseline = 'middle';

		var textCells = this.memory.cells.length;
		var textSize = this.ctx.measureText(textCells);
		var textX = (this.canvas.width - textSize.width) - 20;
		var textY = (this.canvas.height - textSize.width) - 20;

		this.ctx.fillStyle = '#fff';
		this.ctx.fillText(textCells, textX, textY);
	};

	//
	//	Brain paint brain cell helper
	//
	Brain.prototype.paintCell = function(cell) {
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

		var textX = cell.x + (cell.size / 2) - (this.ctx.measureText(cell.query).width / 2);
		var textY = cell.y + (cell.size / 2);

		this.ctx.fillStyle = cell.fill.textColor;
		this.ctx.fillText(cell.query, textX, textY);
	};

	//
	//	Brain update handler
	//
	Brain.prototype.update = function() {
		// console.log('[Brain] Updating memory...');

		// update memory
		this.memory.update();
	};

	//
	//	Brain draw handler
	//
	Brain.prototype.draw = function() {
		// console.log('[Brain] Draw memory...');

		// clear canvas
		// if (!this.busy) {
			// this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// }

		// draw brain cells / memory
		for (var idx = 0; idx < (this.memory.cells.length / 3); idx++) {
			var randomCell = ~~(Math.random() * this.memory.cells.length);
			this.paintCell(this.memory.cells[randomCell]);
		}

		// draw cell stats
		this.paintCounter();
	};

	//
	//	Brain render handler
	//
	Brain.prototype.render = function() {
		// console.log('[Brain] Render...', this.animation);

		// request another frame?
		if (this.animation.useRAF) {
			this.animation.updateTimer = window.requestAnimFrame(this.render.bind(this));
		}

		// benchmark start
		if (benchmark) {
			fpsMeter.begin();
			msMeter.begin();
			// mbMeter.begin();
		}

		// update
		this.update();

		// draw
		this.draw();

		// benchmark end
		if (benchmark) {
			fpsMeter.end();
			msMeter.end();
			// mbMeter.end();
		}
	};

	// expose
	return Brain;
});
