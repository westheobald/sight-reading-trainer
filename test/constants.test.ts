import { rhythmKey, timeSignatureKey, timeSignatureSplit } from '../src/constants';

describe('Rhythm Testing', function rhythmConstantTests() {
  test('rhythmKey Correct Values', function rhythmKeyValuesTest() {
    for (const rhythm of rhythmKey) {
      if (!rhythm.dotted) {
        expect(rhythm.value).toBe(1 / rhythm.number);
      } else {
        expect(rhythm.value).toBe(1 / rhythm.number + 1 / (rhythm.number * 2));
      }
    }
  });
});

describe('Time Signature Testing', function timeSignatureTests() {
  test('timeSignatures Valid', function validTimeSignatureTest() {
    for (const denominator in timeSignatureKey) {
      expect(/(2|4|8|16)/.test(denominator)).toBeTruthy();
      for (const numerator of timeSignatureKey[denominator]) {
        expect(numerator).toBeGreaterThan(0);
        expect(numerator).toBeLessThan(14);
        expect(Number.isInteger(numerator)).toBeTruthy();
      }
    }
  });
  test('Time Signature Splits', function timeSignatureSplitTest() {
    for (const numeratorArr of Object.values(timeSignatureKey)) {
      for (const numerator of numeratorArr) {
        expect(timeSignatureSplit[numerator].reduce((acc, curr) => acc + curr)).toBe(numerator);
      }
    }
  });
});
