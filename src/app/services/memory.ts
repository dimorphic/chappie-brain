/// <reference path="./noise.d.ts" />

// deps
import { Noise } from 'noisejs';
import { Injectable } from '@angular/core';

// const Noise = {};

// models
import Cell from 'app/models/cell';

//
//  Memory model
//
@Injectable()
export default class Memory {
  // memory cells size and list
  public cells: Array<any> = [];
  public cellSize: number = 30;

  // memory grid config
  // based on canvas / window size vs cell size
  private grid = {
    maxCells: 0,
    maxCols: 0,
    maxRows: 0,
  };

  // noise 'activity' map
  private noiseMap: any = null;

  constructor(
    options: any = {},

    // animation options
    // 0 = full memory (default)
    // 1 = single memory
    public updateMode: number = options.updateMode || 0
  ) {
    // console.log('memory options @ ', options, this);

    // init!
    this.boot();
  }

  //
  //  boot()
  //  kickstart memory conciousness
  //
  boot(options?: any) {
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
    // get/update max grid sizes
    this.updateGridSize();

    // build cells grid
    const newCells = [];

    // this.grid.maxCells

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
  generateNoise(noiseSeed?: number) {
    console.log('[Memory] generating noise map...', noiseSeed);

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
  updateSingleCell(cellIndex?: number): void {
    // grab random memory cell index if none given
    const idx = cellIndex || (~~(Math.random() * this.cells.length));

    // grab cell
    const cell = this.cells[idx];

    // generate random memory 'query' body message
    cell.body = cell.getRandomChar();
    cell.fill = this.getCellColor(cell.noise);

    // cell.fill = '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  //
  //	Memory.updateMultiCells()
  //	update multiple random memory cells
  //
  updateMultiCells(): void {
    const divider = 5;
    const maxCells = ~~(this.cells.length / divider);
    const cellsToUpdate = ~~(Math.random() * maxCells) + 1;

    // console.log(`[MEMORY] Updating ${cellsToUpdate} cells...`);

    for (let i = 0; i <= cellsToUpdate; i++) {
      this.updateSingleCell();
    }
  }

  //
  //	Memory.update()
  //	update memory cells loop
  //
  update(): void {
    // console.log('[MEMORY] Update ', this.updateMode, (this.updateMode ? 'single' : 'multi'));
    if (this.updateMode) {
        this.updateSingleCell();
    } else {
        this.updateMultiCells();
    }
  }
}

// expose
// export default Memory;
