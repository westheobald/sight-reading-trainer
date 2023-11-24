import {
  NOTES,
  RHYTHMS,
  ROOT_NOTES,
  SCALES,
  TIME_SIGNATURES,
  TIME_SIG_SPLITS,
} from '../src/constants';

test('RHYTHMS', () => {
  for (const rhythm of RHYTHMS) {
    // Rhythm number
    const denominators = [2, 4, 8, 16];
    expect(denominators.includes(rhythm.number)).toBeTruthy();

    // Rhythm string
    const convert: { [key: string]: number } = { q: 4, h: 2 };
    const match = rhythm.string.match(/\w+(?!=\.)/);
    if (match == null) throw Error('Invalid rhythm');
    const numStr = match[0];
    if (convert[numStr]) expect(convert[numStr]).toBe(rhythm.number);
    else expect(+numStr).toBe(rhythm.number);

    // Rhythm values
    if (!rhythm.dotted) {
      expect(rhythm.value).toBe(1 / rhythm.number);
    } else {
      expect(rhythm.value).toBe(1 / rhythm.number + 1 / (rhythm.number * 2));
    }

    // Rhythm dotted
    if (rhythm.dotted) expect(rhythm.string.at(-1)).toBe('.');
    else expect(rhythm.string.at(-1) != '.').toBeTruthy();
  }
});

test('TIME_SIGNATURES', () => {
  for (const denominator in TIME_SIGNATURES) {
    expect(/(2|4|8|16)/.test(denominator)).toBeTruthy();
    for (const numerator of TIME_SIGNATURES[denominator]) {
      expect(numerator).toBeGreaterThan(0);
      expect(numerator).toBeLessThan(14);
      expect(Number.isInteger(numerator)).toBeTruthy();
    }
  }
});
test('Time Signature Splits', () => {
  for (const numeratorArr of Object.values(TIME_SIGNATURES)) {
    for (const numerator of numeratorArr) {
      expect(TIME_SIG_SPLITS[numerator].reduce((acc, curr) => acc + curr)).toBe(numerator);
    }
  }
});

test('ROOT_NOTES', () => {
  for (const root in ROOT_NOTES) {
    expect(NOTES[ROOT_NOTES[root]].includes(root)).toBeTruthy();
  }
});
//TODO: NOTES testing

describe('SCALES', () => {
  test('Major', () => {
    for (const scale of Object.values(SCALES)) {
      if (!scale.major) expect(scale.numericFormula.includes('b3')).toBeTruthy();
      else expect(scale.numericFormula.includes('3')).toBeTruthy();
    }
  });
  test('Numeric Formula', () => {
    for (const scaleKey in SCALES) {
      expect(SCALES[scaleKey].numericFormula[0]).toBe('1');
      let previousNum = 0;
      for (const el of SCALES[scaleKey].numericFormula) {
        const match = el.match(/^[#b]{0,2}(\d)$/);
        if (match == null) throw Error('Invalid Formula');
        const num = +match[1];
        expect(num).toBeGreaterThanOrEqual(previousNum);
        previousNum = num;
      }
    }
  });
  test('Intervallic Formula', () => {
    for (const scaleKey in SCALES) {
      const total = SCALES[scaleKey].intervallicFormula.reduce((acc, curr) => {
        expect(curr).toBeGreaterThan(0);
        expect(Number.isInteger(curr)).toBeTruthy();
        return acc + curr;
      });
      expect(total).toBe(12);
    }
  });
});
