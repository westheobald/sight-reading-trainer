import { rhythmKey, timeSignatureKey, timeSignatureSplit } from "../src/constants";

describe('Rhythm Testing', function rhythmConstantTests() {
  test('rhythmKey Correct Values', function rhythmKeyValuesTest() {
    for (let i = 0; i < rhythmKey.length; i++) {
      let [rhythm, value] = rhythmKey[i];
      if (rhythm [0] == 'q') rhythm = '4' + rhythm.slice(1);
      if (rhythm[0] == 'h') rhythm = '2' + rhythm.slice(1);

      if (rhythm.at(-1) == '.') {
        const num = Number(rhythm.slice(0, rhythm.length - 1));
        expect(value).toBe(1 / num + 1 / (num * 2));
      } else {
        const num = Number(rhythm);
        expect(value).toBe(1 / num);
      }
    }
  })
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
