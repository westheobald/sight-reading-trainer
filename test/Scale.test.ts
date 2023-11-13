import { possibleNotes, scalesKey } from '../src/constants';
import { Scale } from '../src/Scale';

describe('scalesKey Constant', () => {
  test('numericFormula', () => {
    for (const { numericFormula } of Object.values(scalesKey)) {
      expect(numericFormula[0]).toBe('1');
      for (const el of numericFormula) {
        expect(Number(el.at(-1))).toBeGreaterThan(0);
        expect(Number(el.at(-1))).toBeLessThan(8);
      }
    }
  });
  test('intervallicFormula', () => {
    for (const { intervallicFormula } of Object.values(scalesKey)) {
      expect(intervallicFormula[0]).toBe(0);
      expect(intervallicFormula.reduce((acc, curr) => acc + curr)).toBe(12);
    }
  });
  test('maxInterval', () => {
    for (const { maxInterval, intervallicFormula } of Object.values(scalesKey)) {
      for (var i = 2, max = intervallicFormula[1]; i < intervallicFormula.length; i++) {
        if (intervallicFormula[i] > max) max = intervallicFormula[i];
      }
      expect(maxInterval).toBe(max);
    }
  });
});

describe('Scale class', () => {
  test('Scale Not Found', () => {
    expect(() => new Scale('notascale', 'c')).toThrow();
  });
  test('Root Note Found', () => {
    expect(() => new Scale('major', 'h')).toThrow();
  });
  test('Valid Scales', () => {
    for (const scaleName in scalesKey) {
      for (const root of possibleNotes) {
        const scale = new Scale(scaleName, root);
        expect(scale.intervallicFormula).toBe(scalesKey[scaleName].intervallicFormula);
        expect(scale.numericFormula).toBe(scalesKey[scaleName].numericFormula);
        expect(scale.maxInterval).toBe(scalesKey[scaleName].maxInterval);
        expect(scale.rootNote).toBe(root);
      }
    }
  });
});
