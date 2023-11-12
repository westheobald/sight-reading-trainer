import { generateRhythms } from "../src/generate-rhythm";
import { timeSignatureKey, rhythmKey } from '../src/constants';

describe('Generate Rhythms Testing', () => {
  test('Bars of Rhythm', () => {
    for (let numBars = 1; numBars < 33; numBars++) {
      for (const denominatorKey in timeSignatureKey) {
        const denominator = Number(denominatorKey);
        for (const numerator of timeSignatureKey[denominatorKey]) {
          const rhythms = generateRhythms(numBars, [numerator, denominator]);
          let total = 0;
          const rhythm = rhythmKey.find(el => {
            if (el[0] == 'q' && denominatorKey == '4') return true;
            if (el[0] == 'h' && denominatorKey == '2') return true;
            return el[0] == denominatorKey;
          });
          if (!rhythm) throw Error('Invalid rhythm');
          for (const bar of rhythms) {
            expect(bar.reduce((acc, curr) => acc + curr[1], 0)).toBe(rhythm[1] * numerator);
            total += rhythm[1] * numerator;
          }
          expect(total).toBe(numBars * rhythm[1] * numerator);
        }
      }
    }
  });
});
