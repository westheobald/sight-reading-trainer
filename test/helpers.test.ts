import { getRandomIndex, getRandomInterval } from '../src/helpers';

const iterations = 100;
test('getRandomIndex', () => {
  const maxNums = [1, 2, 3, 5, 10, 100];
  for (const maxNum of maxNums) {
    for (let _ = 0; _ < iterations; _++) {
      const num = getRandomIndex(maxNum);
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(maxNum);
    }
  }
});
test('getRandomInterval', () => {
  const maxIntervals = [1, 2, 3, 4, 5, 6, 7];
  for (const interval of maxIntervals) {
    for (let _ = 0; _ < iterations; _++) {
      const random = getRandomInterval(interval);
      expect(random).toBeGreaterThan(0);
      expect(random).toBeLessThanOrEqual(interval);
    }
  }
});
