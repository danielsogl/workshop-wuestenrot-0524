export class Counter {
  private count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if (this.count === 0) {
      return;
    }
    this.count--;
  }

  getCount(): number {
    return this.count;
  }
}
