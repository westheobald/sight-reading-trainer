import { getRandomIndex } from '../src/helpers';

describe('getRandomIndex Test', function getRandomIndexTest() {
  test('Random number within range', function randomNumWithinRangeTest() {
    const maxNums = [1, 2, 3, 5, 10, 100];
    for (const maxNum of maxNums) {
      for (let _ = 0; _ < 1000; _++) {
        const num = getRandomIndex(maxNum);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThan(maxNum);
      }
    }
  });
  test('Random number all values', function randomIndexDistributionTest() {
    const maxNums = [1, 2, 3, 5, 10, 100];
    for (const maxNum of maxNums) {
      const distribution = new Array(maxNum).fill(0);
      const iterations = 100000;
      for (let _ = 0; _ < iterations; _++) {
        distribution[getRandomIndex(maxNum)]++;
      }
      for (const el of distribution) {
        const average = iterations / maxNum;
        expect(Math.abs(el)).toBeLessThanOrEqual(average * 1.2);
        expect(Math.abs(el)).toBeGreaterThanOrEqual(average * 0.8);
      }
    }
  });
});
