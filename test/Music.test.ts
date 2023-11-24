import { Music, MusicSettings } from '../src/Music';
import {
  MAX_RANGE,
  MAX_TEMPO,
  MIN_RANGE,
  MIN_TEMPO,
  ROOT_NOTES,
  SCALES,
  TIME_SIGNATURES,
} from '../src/constants';

const defaultOptions: MusicSettings = {
  rootNote: 'c',
  scaleKey: 'ionian',
  tempo: 120,
  timeSignature: [4, 4],
  range: [50, 80],
  maxScaleSteps: 2,
};

describe('Music Validation Functions', () => {
  test('Valid Root Notes', () => {
    const options = Object.assign({}, defaultOptions);
    for (const root in ROOT_NOTES) {
      options.rootNote = root;
      const music = new Music(options);
      expect(music.rootNote).toBe(root);
    }
  });
  test('Invalid Root Notes', () => {
    const options = Object.assign({}, defaultOptions);
    const invalid = ['abb', 'b#', 'gbb', 'e#', 'fb'];
    for (const root of invalid) {
      options.rootNote = root;
      expect(() => new Music(options)).toThrow();
    }
  });
  test('Valid Scales', () => {
    const options = Object.assign({}, defaultOptions);
    for (const scale in SCALES) {
      options.scaleKey = scale;
      const music = new Music(options);
      expect(music.scale).toBe(SCALES[scale]);
    }
  });
  test('Invalid Scales', () => {
    const options = Object.assign({}, defaultOptions);
    const invalid = ['noscale', 'mjor', 'minr'];
    for (const scale in invalid) {
      options.scaleKey = scale;
      expect(() => new Music(options)).toThrow();
    }
  });
  test('Key Signature', () => {
    const options = Object.assign({}, defaultOptions);
    for (const root in ROOT_NOTES) {
      options.rootNote = root;
      for (const [scaleKey, scale] of Object.entries(SCALES)) {
        options.scaleKey = scaleKey;
        const music = new Music(options);
        if (scale.major) {
          expect(music.keySignature).toBe(root);
        } else {
          expect(music.keySignature).toBe(root + 'm');
        }
      }
    }
  });
  test('Valid Tempos', () => {
    const options = Object.assign({}, defaultOptions);
    for (let i = MIN_TEMPO; i <= MAX_TEMPO; i++) {
      options.tempo = i;
      const music = new Music(options);
      expect(music.tempo).toBe(i);
    }
  });
  test('Invalid Tempos', () => {
    const options = Object.assign({}, defaultOptions);
    const invalid = [MIN_TEMPO - 1, MAX_TEMPO + 1, 50.2, 80.1];
    for (const tempo of invalid) {
      options.tempo = tempo;
      expect(() => new Music(options)).toThrow();
    }
  });
  test('Valid Time Signatures', () => {
    const options = Object.assign({}, defaultOptions);
    for (const denominatorKey in TIME_SIGNATURES) {
      const denominator = +denominatorKey;
      for (const numerator of TIME_SIGNATURES[denominatorKey]) {
        options.timeSignature = [numerator, denominator];
        const music = new Music(options);
        expect(String(music.timeSignature)).toBe(String([numerator, denominator]));
      }
    }
  });
  test('Invalid Time Signatures', () => {
    const options = Object.assign({}, defaultOptions);
    const invalid: [number, number][] = [
      [8, 4],
      [1, 4],
      [4, 2],
      [14, 4],
    ];
    for (const timeSig of invalid) {
      options.timeSignature = timeSig;
      expect(() => new Music(options)).toThrow();
    }
  });
  test('Valid Scale Steps', () => {
    const options = Object.assign({}, defaultOptions);
    for (const scale in SCALES) {
      options.scaleKey = scale;
      for (let i = 1; i <= SCALES[scale].numericFormula.length; i++) {
        options.maxScaleSteps = i;
        const music = new Music(options);
        expect(music.maxScaleSteps).toBe(i);
      }
    }
  });
  test('Invalid Scale Steps', () => {
    const options = Object.assign({}, defaultOptions);
    for (const scale in SCALES) {
      options.scaleKey = scale;
      const invalid = [0, SCALES[scale].numericFormula.length + 1];
      for (const scaleSteps of invalid) {
        options.maxScaleSteps = scaleSteps;
        expect(() => new Music(options)).toThrow();
      }
    }
  });
  test('Valid Range', () => {
    const options = Object.assign({}, defaultOptions);
    for (let i = MIN_RANGE; i <= MAX_RANGE - 12; i++) {
      for (let j = i + 12; j <= MAX_RANGE; j++) {
        options.range = [i, j];
        const music = new Music(options);
        expect(String(music.range)).toBe(String([i, j]));
      }
    }
  });
  test('Invalid Range', () => {
    const options = Object.assign({}, defaultOptions);
    const invalid: [number, number][] = [
      [20, 50],
      [118, 129],
    ];
    for (const range of invalid) {
      options.range = range;
      expect(() => new Music(options)).toThrow();
    }
  });
});

describe('getNotes Tests', () => {
  test('getNotes Major', () => {
    const options = Object.assign({}, defaultOptions);
    options.scaleKey = 'ionian';
    const testScales: [string, string[]][] = [
      ['c', ['c', 'd', 'e', 'f', 'g', 'a', 'b']],
      ['db', ['db', 'eb', 'f', 'gb', 'ab', 'bb', 'c']],
      ['d', ['d', 'e', 'f#', 'g', 'a', 'b', 'c#']],
      ['eb', ['eb', 'f', 'g', 'ab', 'bb', 'c', 'd']],
      ['e', ['e', 'f#', 'g#', 'a', 'b', 'c#', 'd#']],
      ['f', ['f', 'g', 'a', 'bb', 'c', 'd', 'e']],
      ['gb', ['gb', 'ab', 'bb', 'cb', 'db', 'eb', 'f']],
      ['cb', ['gb', 'ab', 'bb', 'cb', 'db', 'eb', 'fb']],
      ['g', ['g', 'a', 'b', 'c', 'd', 'e', 'f#']],
      ['ab', ['ab', 'bb', 'c', 'db', 'eb', 'f', 'g']],
      ['a', ['a', 'b', 'c#', 'd', 'e', 'f#', 'g#']],
      ['bb', ['bb', 'c', 'd', 'eb', 'f', 'g', 'a']],
      ['b', ['b', 'c#', 'd#', 'e', 'f#', 'g#', 'a#']],
      ['c#', ['c#', 'd#', 'e#', 'f#', 'g#', 'a#', 'b#']],
      ['f#', ['f#', 'g#', 'a#', 'b', 'c#', 'd#', 'e#']],
    ];
    for (const [root, scale] of testScales) {
      options.rootNote = root;
      const music = new Music(options);
      if (!music.scale.notes) throw Error('Scale has no notes');
      const noteSet = new Set(scale);
      for (const note of music.scale.notes) {
        if (note == undefined) continue;
        expect(noteSet.has(note)).toBeTruthy();
      }
    }
  });
  test('getNotes Major Pentatonic', () => {
    const options = Object.assign({}, defaultOptions);
    options.scaleKey = 'majorPentatonic';
    const testScales: [string, string[]][] = [
      ['c', ['c', 'd', 'e', 'g', 'a']],
      ['db', ['db', 'eb', 'f', 'ab', 'bb']],
      ['d', ['d', 'e', 'f#', 'a', 'b']],
      ['eb', ['eb', 'f', 'g', 'bb', 'c']],
      ['e', ['e', 'f#', 'g#', 'b', 'c#']],
      ['f', ['f', 'g', 'a', 'c', 'd']],
      ['gb', ['gb', 'ab', 'bb', 'db', 'eb']],
      ['cb', ['cb', 'db', 'eb', 'gb', 'ab']],
      ['g', ['g', 'a', 'b', 'd', 'e']],
      ['ab', ['ab', 'bb', 'c', 'eb', 'f']],
      ['a', ['a', 'b', 'c#', 'e', 'f#']],
      ['bb', ['bb', 'c', 'd', 'f', 'g']],
      ['b', ['b', 'c#', 'd#', 'f#', 'g#']],
      ['c#', ['c#', 'd#', 'e#', 'g#', 'a#']],
      ['f#', ['f#', 'g#', 'a#', 'c#', 'd#']],
    ];
    for (const [root, scale] of testScales) {
      options.rootNote = root;
      const music = new Music(options);
      if (!music.scale.notes) throw Error('Scale has no notes');
      const noteSet = new Set(scale);
      for (const note of music.scale.notes) {
        if (note == undefined) continue;
        expect(noteSet.has(note)).toBeTruthy();
      }
    }
  });
});

//TODO: getRhythms tests
//TODO: Generate notes test
