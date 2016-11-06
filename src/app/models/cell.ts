//
//  (Memory) Cell model
//

// {
// 	id: 'cell_' + i,
// 	size: this.cellSize,
// 	query: helpers.getRandomChar(),
// 	noise: null,
// 	fill: null,
//
// 	x: cellPosition.colIndex * this.cellSize,
// 	y: cellPosition.rowIndex * this.cellSize
// }

export default class Cell {

  public id: string;
  public body: string;
  public size: number;

  public fill: any;
  public noise: any;

  public x: number;
  public y: number;

  constructor(options = {}) {
    // spread options
    const { id, x, y, size, fill, noise }: any = options;

    // cell uid
    this.id = `cell_${id}`;

    // cell body 'message'
    this.body = this.getRandomChar();

    // cell position & size
    this.size = size;
    this.x = x * this.size;
    this.y = y * this.size;

    // cell styles
    this.fill = fill || null;
    this.noise = noise || null;
  }

  getRandomChar() {
    // @ and $ are ugly with Exo. need better font?
    const chars = '!#%&^()_=+,.:<>?';
    const randomChar = chars[~~(Math.random() * chars.length)];

    return randomChar;
  }
}
