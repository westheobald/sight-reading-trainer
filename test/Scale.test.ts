import { ROOT_NOTES, SCALES } from '../src/constants';
import { Scale } from '../src/Scale';

describe('Scale class', () => {
  test('Scale Not Found', () => {
    expect(() => new Scale('notascale', 'c')).toThrow();
  });
  test('Root Note Found', () => {
    expect(() => new Scale('major', 'h')).toThrow();
  });
  test('Valid Scales', () => {
    for (const scaleName in SCALES) {
      for (const root in ROOT_NOTES) {
        const scale = new Scale(scaleName, root);
        expect(scale.intervallicFormula).toBe(SCALES[scaleName].intervallicFormula);
        expect(scale.numericFormula).toBe(SCALES[scaleName].numericFormula);
        expect(scale.maxInterval).toBe(SCALES[scaleName].maxInterval);
        expect(scale.rootNote).toBe(root);
      }
    }
  });
});
