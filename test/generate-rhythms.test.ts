import { generateRhythms } from '../src/generate-rhythm';
import { TIME_SIGNATURES, RHYTHMS } from '../src/constants';

describe('Generate Rhythms Testing', () => {
  test('Bars of Rhythm', () => {
    for (let numBars = 1; numBars < 33; numBars++) {
      for (const denominatorKey in TIME_SIGNATURES) {
        const denominator = Number(denominatorKey);
        for (const numerator of TIME_SIGNATURES[denominatorKey]) {
          const defaultRhythms = Array.from(RHYTHMS);
          const rhythms = generateRhythms(numBars, [numerator, denominator], defaultRhythms);
          let total = 0;
          const baseRhythmValue = RHYTHMS.find((rhythm) => {
            return !rhythm.dotted && rhythm.number == denominator;
          })?.value;
          if (!baseRhythmValue) throw Error('Invalid rhythm');

          for (const bar of rhythms) {
            expect(bar.reduce((acc, curr) => acc + curr.value, 0)).toBe(
              baseRhythmValue * numerator,
            );
            total += baseRhythmValue * numerator;
          }
          expect(total).toBe(numBars * baseRhythmValue * numerator);
        }
      }
    }
  });
});
