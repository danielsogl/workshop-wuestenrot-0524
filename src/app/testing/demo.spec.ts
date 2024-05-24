import { Counter } from './demo';

describe('Test Counter Class', () => {
  it('should increment count by 1', () => {
    // Arrange
    const counter = new Counter();
    // Act
    counter.increment();
    // Assert
    expect(counter.getCount()).toBe(1);
  });

  it('should decrement count by 1', () => {
    // Arrange
    const counter = new Counter();
    // Act
    counter.increment();
    counter.decrement();
    // Assert
    expect(counter.getCount()).toBe(0);
  });

  it('should not decrement count below 0', () => {
    // Arrange
    const counter = new Counter();
    // Act
    counter.decrement();
    // Assert
    expect(counter.getCount()).toBe(0);
  });
});
