define(function(require){
	'use strict';

	// deps
	var helpers = require('common/helpers');
	var Noise = require('noise');

	//
	//	Memory Entity
	//
	var Memory = function(opts) {
		if (!opts) { opts = {}; }

		// cell size
		this.cellSize = opts.cellSize || 30;

		// memory cells list and noise 'activity' map
		this.cells = [];
		this.noiseMap = null;

		// grid config
		this.grid = {
			maxCells: null,
			maxCols: null,
			maxRows: null
		};

		// animation options
		// 0 = full memory (default)
		// 1 = single memory
		this.updateMode = opts.updateMode || 0;

		// _init
		this.boot(opts);
	};

	//
	//	Memory.boot()
	//	kick start memory conciousness
	//
	Memory.prototype.boot = function(opts) {
		// console.log('[Memory] booting...', opts);

		// create full memory
		this.build();

		// add noise to memory cells
		this.generateNoise();
	};

	//
	//	Memory.build()
	//	build memory
	//
	Memory.prototype.build = function() {
		// get/update max grid sizes
		this.updateGridSize();

		// build cells grid
		var newCells = [];

		for (var i = 0; i < this.grid.maxCells; i++) {
			var cellPosition = this.getCellGridPosition(i);

			newCells.push({
				id: 'cell_' + i,
				size: this.cellSize,
				query: helpers.getRandomChar(),
				noise: null,
				fill: null,

				x: cellPosition.colIndex * this.cellSize,
				y: cellPosition.rowIndex * this.cellSize
			});
		}

		// update model cells list
		this.cells = newCells;
	};

	//
	//	Memory.generateNoise()
	//	generate noise map and apply to memory cells
	//
	Memory.prototype.generateNoise = function(seed) {
		// console.log('[Memory] generating noise map...', seed);

		if (!this.cells.length) {
			throw new Error('No Memory cells, bro.');
		}

		seed = seed || Math.random();

		// reset noise map
		this.noiseMap = new Noise(seed);

		// add noise to memory cells
		this.cells.forEach(function(memoryCell, idx) {
			var cellPosition = this.getCellGridPosition(idx);
			memoryCell.noise = this.getCellNoise(cellPosition);
			memoryCell.fill = this.getCellColor(memoryCell.noise);
		}.bind(this));
	};

	//
	//	Memory.updateGridSize()
	//	calculate grid size based on get max grid sizes
	//
	Memory.prototype.updateGridSize = function() {
		// grab screen max details
		var screen = this.getMaxScreenCells(this.cellSize);

		// console.log('screen grid: ', screen);

		// update memory grid config
		this.grid.maxCells = screen.maxCells;
		this.grid.maxCols = screen.maxCols;
		this.grid.maxRows = screen.maxRows;
	};

	//
	//	Memory.getMaxScreenCells
	//	get max number of cells, cols and rows available on screen
	//	based on cell size
	//
	Memory.prototype.getMaxScreenCells = function(cellSize) {
		// get grid max cols and rows
		var maxCols = ~~(window.innerWidth / cellSize);
		var maxRows = ~~(window.innerHeight / cellSize);

		// total number of cells
		var maxCells = maxCols * maxRows;

		return {
			maxCells: maxCells,
			maxCols: maxCols,
			maxRows: maxRows
		};
	};

	//
	//	Memory.getCellGridPosition(cellIndex)
	//	get col and row numbers for cell at array index position
	//
	Memory.prototype.getCellGridPosition = function(cellIndex) {
		var rowIndex = null;
		var colIndex = null;

		rowIndex = ~~(cellIndex / this.grid.maxCols);
		colIndex = Math.ceil(cellIndex % this.grid.maxCols);

		return {
			colIndex: colIndex,
			rowIndex: rowIndex
		};
	};

	//
	//	Memory.getCellNoise(cellPosition)
	//	get cell noise percent value
	//
	Memory.prototype.getCellNoise = function(cellPosition) {
		var noise = this.noiseMap;

		var cellValue = noise.perlin2(cellPosition.colIndex / 15, cellPosition.rowIndex / 15);
		var cellPercent = ~~(((cellValue + 1) / 2) * 100);

		return cellPercent;
	};

	//
	//	Memory.getCellColor(cellNoise)
	//	get cell color based on noise percent
	//
	Memory.prototype.getCellColor = function(noise) {
		if (!noise) {
			throw new Error('Need noise, bro!');
		}

		// snapshot value
		var val = noise;

		var hue, saturation, lightness,
			textLightness;

		// random factor
		var randomness = ~~(Math.random() * 25);

		// Hue
		if (val < 70) {
			hue = 200 + (randomness / 2);
		} else {
			hue = 60 - randomness;
		}

		// Saturation
		// saturation = ~~(Math.random() * 90) * (val / randomness);
		saturation = 90;

		// Lightness
		if (val < 50) {
			lightness = 5;
		} else {
			lightness = val / 1.5 - randomness;
		}

		// Text lightness
		if (val < 45) {
			textLightness = lightness;
		} else if (val < 80) {
			textLightness = lightness + 10;
		} else {
			textLightness = lightness - 10;
		}

		var bgColor = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
		var textColor = 'hsl(' + hue + ', ' + saturation + '%, ' + textLightness + '%)';

		return {
			bgColor: bgColor,
			textColor: textColor
		};
	};

	//
	//	Memory.updateSingleCell(cellIndex)
	//	update memory cell at index no. or a random one
	//
	Memory.prototype.updateSingleCell = function(cellIndex) {
		// grab random memory cell index if none given
		if (!cellIndex) {
			cellIndex = ~~(Math.random() * this.cells.length);
		}

		// grab cell
		var cell = this.cells[cellIndex];

		// generate random memory 'query'
		cell.query = helpers.getRandomChar();
		cell.fill = this.getCellColor(cell.noise);
	};

	//
	//	Memory.updateMultiCells()
	//	update multiple random memory cells
	//
	Memory.prototype.updateMultiCells = function() {
		var maxCells = parseInt(this.cells.length / 5, 10);
		var cellsToUpdate = ~~(Math.random() * maxCells) + 1;

		for (var i = 0; i <= cellsToUpdate; i++) {
			this.updateSingleCell();
		}
	};

	//
	//	Memory.update()
	//	update memory cells loop
	//
	Memory.prototype.update = function() {
		if (this.updateMode) {
			this.updateSingleCell();
		} else {
			this.updateMultiCells();
		}
	};

	// expose
	return Memory;
});
