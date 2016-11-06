import { Injectable } from '@angular/core';

@Injectable()
export default class CounterService {
  private count: number = 0;

  inc() {
    this.count++;
  }

  dec() {
    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}
