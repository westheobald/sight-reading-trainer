import { Music } from '../src/Music';
import { MAX_INTERVAL, MAX_RANGE, MAX_TEMPO, MIN_RANGE, MIN_TEMPO, ROOT_NOTES, SCALES, TIME_SIGNATURES } from '../src/constants';

describe('Music Validation Functions', () => {
  test('Valid Root Notes', () => {
    const func = Music.validateRootNote;
    for (const root in ROOT_NOTES) {
      expect(func(root)).toBe(root);
    }
  });
  test('Invalid Root Notes', () => {
    const func = Music.validateRootNote;
    const invalid = ['abb', 'b#', 'gbb', 'e#', 'fb'];
    for (const root of invalid) {
      expect(() => func(root)).toThrow();
    }
  });
  test('Valid Scales', () => {
    const func = Music.validateScale;
    for (const scale in SCALES) {
      expect(func(scale)).toBe(SCALES[scale]);
    }
  });
  test('Invalid Scales', () => {
    const func = Music.validateScale;
    const invalid = ['noscale', 'mjor', 'minr'];
    for (const scale in invalid) {
      expect(() => func(scale)).toThrow();
    }
  });
  test('Key Signature', () => {
    const func = Music.getKeySignature;
    for (const root in ROOT_NOTES) {
      for (const scale of Object.values(SCALES)) {
        if (scale.major) {
          expect(func(root, scale)).toBe(root);
        } else {
          expect(func(root, scale)).toBe(root + 'm');
        }
      }
    }
  });
  test('Valid Tempos', () => {
    const func = Music.validateTempo;
    for (let i = MIN_TEMPO; i <= MAX_TEMPO; i++) {
      expect(func(i)).toBe(i);
    }
  });
  test('Invalid Tempos', () => {
    const func = Music.validateTempo;
    const invalid = [MIN_TEMPO - 1, MAX_TEMPO + 1, 50.2, 80.1];
    for (const tempo of invalid) {
      expect(() => func(tempo)).toThrow();
    }
  });
  test('Valid Time Signatures', () => {
    const func = Music.validateTimeSignature;
    for (const denominatorKey in TIME_SIGNATURES) {
      const denominator = +denominatorKey;
      for (const numerator of TIME_SIGNATURES[denominatorKey]) {
        expect(String(func([numerator, denominator]))).toBe(String([numerator, denominator]));
      }
    }
  });
  test('Invalid Time Signatures', () => {
    const func = Music.validateTimeSignature;
    const invalid: [number, number][] = [[8,4],[1,4],[4,2],[14,4]];
    for (const timeSig of invalid) {
      expect(() => func(timeSig)).toThrow();
    }
  });
  test('Valid Range', () => {
    const func = Music.validateRange;
    for (let i = MIN_RANGE; i <= MAX_RANGE - 12; i++) {
      for (let j = i + 12; j <= MAX_RANGE; j++) {
        expect(String(func([i,j]))).toBe(String([i,j]));
      }
    }
  });
  test('Invalid Range', () => {
    const func = Music.validateRange;
    const invalid: [number, number][] = [[20, 50],[21,32],[117,128],[118,129]];
    for (const range of invalid) {
      expect(() => func(range)).toThrow();
    }
  });
  test('Valid Interval Size', () => {
    const func = Music.validateIntervalSize;
    for (const scale of Object.values(SCALES)) {
      for (let i = scale.maxInterval; i < MAX_INTERVAL; i++) {
        expect(func(i, scale)).toBe(i);
      }
    }
  });
  test('Invalid Interval Size', () => {
    const func = Music.validateIntervalSize;
    for (const scale of Object.values(SCALES)) {
      for (let i = 0; i < scale.maxInterval; i++) {
        expect(()=>func(i, scale)).toThrow();
      }
    }
  });
  test('getNotes Major', () => {
    const func = Music.getNotes;
    const testScales: [string, string[]][] = [
      ['c', ['c', 'd', 'e', 'f', 'g', 'a', 'b']],
      ['db', ['db', 'eb', 'f', 'gb', 'ab', 'bb', 'c']],
      ['d', ['d', 'e', 'f#', 'g', 'a', 'b', 'c#']],
      ['eb', ['eb', 'f', 'g', 'ab', 'bb', 'c', 'd']],
      ['e', ['e', 'f#', 'g#', 'a', 'b', 'c#', 'd#']],
      ['f', ['f', 'g', 'a', 'bb', 'c', 'd', 'e']],
      ['gb', ['gb', 'ab', 'bb', 'cb', 'db', 'eb', 'f']],
      ['g', ['g', 'a', 'b', 'c', 'd', 'e', 'f#']],
      ['ab', ['ab', 'bb', 'c', 'db', 'eb', 'f', 'g']],
      ['a', ['a', 'b', 'c#', 'd', 'e', 'f#', 'g#']],
      ['bb', ['bb', 'c', 'd', 'eb', 'f', 'g', 'a']],
      ['b', ['b', 'c#', 'd#', 'e', 'f#', 'g#', 'a#']],
      ['c#', ['c#', 'd#', 'e#', 'f#', 'g#', 'a#', 'b#']],
      ['d#', ['d#', 'e#', 'f##', 'g#', 'a#', 'b#', 'c##']],
      ['f#', ['f#', 'g#', 'a#', 'b', 'c#', 'd#', 'e#']],
      ['g#', ['g#', 'a#', 'b#', 'c#', 'd#', 'e#', 'f##']],
      ['a#', ['a#', 'b#', 'c##', 'd#', 'e#', 'f##', 'g##']],
    ];
    for (const [root, scale] of testScales) {
      const notes = func(root, SCALES.major);
      const noteSet = new Set(notes);
      for (const note of scale) {
        expect(noteSet.has(note)).toBeTruthy();
      }
    }
  });
  test('getNotes Major Pentatonic', () => {
    const func = Music.getNotes;
    const testScales: [string, string[]][] = [
      ['c', ['c', 'd', 'e', 'g', 'a']],
      ['db', ['db', 'eb', 'f', 'ab', 'bb']],
      ['d', ['d', 'e', 'f#', 'a', 'b']],
      ['eb', ['eb', 'f', 'g', 'bb', 'c']],
      ['e', ['e', 'f#', 'g#', 'b', 'c#']],
      ['f', ['f', 'g', 'a', 'c', 'd']],
      ['gb', ['gb', 'ab', 'bb', 'db', 'eb']],
      ['g', ['g', 'a', 'b', 'd', 'e']],
      ['ab', ['ab', 'bb', 'c', 'eb', 'f']],
      ['a', ['a', 'b', 'c#', 'e', 'f#']],
      ['bb', ['bb', 'c', 'd', 'f', 'g']],
      ['b', ['b', 'c#', 'd#', 'f#', 'g#']],
      ['c#', ['c#', 'd#', 'e#', 'g#', 'a#']],
      ['d#', ['d#', 'e#', 'f##', 'a#', 'b#']],
      ['f#', ['f#', 'g#', 'a#', 'c#', 'd#']],
      ['g#', ['g#', 'a#', 'b#', 'd#', 'e#']],
      ['a#', ['a#', 'b#', 'c##', 'e#', 'f##']],
    ];
    for (const [root, scale] of testScales) {
      const notes = func(root, SCALES.majorPentatonic);
      const noteSet = new Set(notes);
      for (const note of scale) {
        expect(noteSet.has(note)).toBeTruthy();
      }
    }
  });
});
