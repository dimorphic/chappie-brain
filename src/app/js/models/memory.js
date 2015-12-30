// deps
import { Noise } from 'noisejs';

// models
import Cell from './cell';

//
//  Memory model
//
class Memory {
    constructor(options = {}) {
        // spread options
        const { cellSize = 30, updateMode = 0 } = options;

        // memory cells size and list
        this.cells = [];
        this.cellSize = cellSize;

        // noise 'activity' map
        this.noiseMap = null;

        // memory grid config
        // based on canvas / window size vs cell size
        this.grid = {
            maxCells: null,
            maxCols: null,
            maxRows: null
        };

        // animation options
        // 0 = full memory (default)
        // 1 = single memory
        this.updateMode = updateMode;

        // init!
        this.boot(options);
    }

    //
    //  boot()
    //  kickstart memory conciousness
    //
    boot(options) {
        console.log('boot memory');

        // create memory
        this.build();

        // generate noise map
        this.generateNoise();
    }

    //
    //  build()
    //  build memory cells
    //
    build() {
        console.log('build memory');

        // get/update max grid sizes
        this.updateGridSize();

		// build cells grid
        const newCells = [];

        for (let i = 0; i < this.grid.maxCells; i++) {
            const { colIndex, rowIndex } = this.getCellGridPosition(i);

            newCells.push(new Cell({
                id: i,
                size: this.cellSize,

                x: colIndex,
                y: rowIndex
            }));
        }

        // update model cells list
        this.cells = newCells;
    }

    //
	//	generateNoise()
	//	generate noise map and apply to memory cells
	//
    generateNoise(noiseSeed) {
        // console.log('[Memory] generating noise map...', seed);

        if (!this.cells.length) {
            throw new Error('No Memory cells, bro.');
        }

        const seed = noiseSeed || Math.random();

        // generate map based on seed
        this.noiseMap = new Noise(seed);

        // add noise to memory cells
        this.cells.forEach((cell, idx) => {
            const cellPosition = this.getCellGridPosition(idx);

            cell.noise = this.getCellNoise(cellPosition);
            cell.fill = this.getCellColor(cell.noise);
        });
    }

    //
    //  updateGridSize()
    //  calculate grid size based on get max grid sizes
    //
    updateGridSize() {
        // grab screen max details
        const screen = this.getMaxScreenCells(this.cellSize);

        // console.log('screen grid: ', screen);

        // update memory grid config
        this.grid.maxCells = screen.maxCells;
        this.grid.maxCols = screen.maxCols;
        this.grid.maxRows = screen.maxRows;
    }

    //
    //	Memory.getMaxScreenCells
    //	get max number of cells, cols and rows available on screen
    //	based on cell size
    //
    getMaxScreenCells(cellSize) {
        // get grid max cols and rows
        const maxCols = ~~(window.innerWidth / cellSize);
        const maxRows = ~~(window.innerHeight / cellSize);

        // total number of cells
        const maxCells = maxCols * maxRows;

        return {
            maxCells,
            maxCols,
            maxRows
        };
    }

    //
    //	getCellGridPosition(cellIndex)
    //	get col and row numbers for cell at array index position
    //
    getCellGridPosition(cellIndex) {
        const rowIndex = ~~(cellIndex / this.grid.maxCols);
        const colIndex = Math.ceil(cellIndex % this.grid.maxCols);

        return {
            colIndex,
            rowIndex
        };
    }

    //
    //	Memory.getCellNoise(cellPosition)
    //	get cell noise percent value
    //
    getCellNoise(cellPosition) {
        const noise = this.noiseMap;
        const cellValue = noise.perlin2(cellPosition.colIndex / 15, cellPosition.rowIndex / 15);
        const cellPercent = ~~(((cellValue + 1) / 2) * 100);

        return cellPercent;
    }

    //
    //	Memory.getCellColor(cellNoise)
    //	get cell color based on noise percent
    //
    getCellColor(noise) {
        if (!noise) {
            throw new Error('Need noise, bro!');
        }

        // color values
        let hue;
        let saturation;
        let lightness;
        let textLightness;

        // random factor
        const randomness = ~~(Math.random() * 25);

        // Hue
        if (noise < 70) {
            hue = 200 + (randomness / 2);
        } else {
            hue = 60 - randomness;
        }

        // Saturation
        // saturation = ~~(Math.random() * 90) * (noise / randomness);
        saturation = 90;

        // Lightness
        if (noise < 50) {
            lightness = 5;
        } else {
            lightness = noise / 1.5 - randomness;
        }

        // Text lightness
        if (noise < 45) {
            textLightness = lightness;
        } else if (noise < 80) {
            textLightness = lightness + 10;
        } else {
            textLightness = lightness - 10;
        }

        // build HSL color values
        const bgColor = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
        const textColor = 'hsl(' + hue + ', ' + saturation + '%, ' + textLightness + '%)';

        return {
            bgColor,
            textColor
        };
    }

    //
    //	Memory.updateSingleCell(cellIndex)
    //	update memory cell at index no. or a random one
    //
    updateSingleCell(cellIndex) {
        // grab random memory cell index if none given
        const idx = cellIndex || (~~(Math.random() * this.cells.length));

        // grab cell
        const cell = this.cells[idx];

        // generate random memory 'query' body message
        // cell.body = cell.getRandomChar();
        cell.fill = this.getCellColor(cell.noise);
    }

    //
    //	Memory.updateMultiCells()
    //	update multiple random memory cells
    //
    updateMultiCells() {
        const maxCells = parseInt(this.cells.length / 5, 10);
        const cellsToUpdate = ~~(Math.random() * maxCells) + 1;

        for (let i = 0; i <= cellsToUpdate; i++) {
            this.updateSingleCell();
        }
    }

    //
    //	Memory.update()
    //	update memory cells loop
    //
    update() {
        if (this.updateMode) {
            this.updateSingleCell();
        } else {
            this.updateMultiCells();
        }
    }
}

// expose
export default Memory;
