import { RHYTHMS, TIME_SIGNATURES, TIME_SIG_SPLITS } from '../src/constants';

describe('Rhythm Testing', function rhythmConstantTests() {
  test('RHYTHMS Correct Values', function rhythmKeyValuesTest() {
    for (const rhythm of RHYTHMS) {
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
    for (const denominator in TIME_SIGNATURES) {
      expect(/(2|4|8|16)/.test(denominator)).toBeTruthy();
      for (const numerator of TIME_SIGNATURES[denominator]) {
        expect(numerator).toBeGreaterThan(0);
        expect(numerator).toBeLessThan(14);
        expect(Number.isInteger(numerator)).toBeTruthy();
      }
    }
  });
  test('Time Signature Splits', function TIME_SIG_SPLITSTest() {
    for (const numeratorArr of Object.values(TIME_SIGNATURES)) {
      for (const numerator of numeratorArr) {
        expect(TIME_SIG_SPLITS[numerator].reduce((acc, curr) => acc + curr)).toBe(numerator);
      }
    }
  });
});
