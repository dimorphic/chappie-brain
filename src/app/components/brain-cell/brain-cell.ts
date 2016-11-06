// deps
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';

// styles
import './brain-cell.scss';

interface ICellFill {
  textColor: string;
  bgColor: string;
};

@Component({
  selector: 'brain-cell',
  template: require('./brain-cell.html'),
  directives: [ NgStyle ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BrainCell {
  private _fill: any;
  private style: any = {};

  @Input() private body: string;
  @Input() private size: number;
  @Input() private set fill(newFill: ICellFill) {
    this._fill = newFill;

    // recalc style (@TODO: check performance for direct call on fn in view)
    this.style = this.getCellStyle();
  }

  constructor() {}

  getCellStyle(): Object {
    const { _fill, size, style } = this;

    return {
      width: size + 'px',
      height: size + 'px',
      fontSize: (style.fontSize ? style.fontSize : (size * 0.5)),

      color: _fill.textColor || '',
      backgroundColor: _fill.bgColor || ''
    };
  }
}
