import {
  MAX_RANGE,
  MAX_TEMPO,
  MIN_RANGE,
  MIN_TEMPO,
  RHYTHMS,
  SCALES,
  TIME_SIGNATURES,
  TIME_SIG_SPLITS,
} from '../src/constants';

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

describe('Scale Testing', function scaleTests() {
  test('Numeric Formula', function validNumericFormulas() {
    for (const scaleKey in SCALES) {
      expect(SCALES[scaleKey].numericFormula[0]).toBe('1');
      let previousNum = 0;
      for (const el of SCALES[scaleKey].numericFormula) {
        const match = el.match(/^[#b]?(\d)$/);
        if (match == null) throw Error('Invalid Formula');
        const num = +match[1];
        expect(num).toBeGreaterThanOrEqual(previousNum);
        previousNum = num;
      }
    }
  });
  test('Intervallic Formula', function validIntervallicFormula() {
    for (const scaleKey in SCALES) {
      const total = SCALES[scaleKey].intervallicFormula.reduce((acc, curr) => {
        expect(curr).toBeGreaterThan(0);
        return acc + curr;
      });
      expect(total).toBe(12);
    }
  });
  test('Max Interval', function validMaxInterval() {
    for (const scaleKey in SCALES) {
      const max = SCALES[scaleKey].intervallicFormula.reduce((acc, curr) =>
        curr > acc ? curr : acc,
      );
      expect(max).toBe(SCALES[scaleKey].maxInterval);
    }
  });
});

describe('Max/Min Constants', function maxMinConstantTests() {
  test('Ensure Integers', function maxMinIntergers() {
    const tests = [MAX_RANGE, MIN_RANGE, MAX_TEMPO, MIN_TEMPO];
    for (const num of tests) {
      expect(Number.isInteger(num)).toBeTruthy();
      expect(num).toBeGreaterThan(0);
    }
  });
});
