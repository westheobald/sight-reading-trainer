export const MAX_TEMPO= 300;
export const MIN_TEMPO= 20;
export const MIN_RANGE= 21;
export const MAX_RANGE= 128;
export const REPEATED_NOTE_PERCENTAGE= 0.05;
export const TUNING_FREQUENCY = 440;

export type rhythm = {
  string: string;
  number: number;
  value: number;
  dotted: boolean;
  ms?: number;
};
export const RHYTHMS: rhythm[] = [
  { string: '16', number: 16, value: 0.0625, dotted: false },
  { string: '8', number: 8, value: 0.125, dotted: false },
  { string: '8.', number: 8, value: 0.1875, dotted: true },
  { string: 'q', number: 4, value: 0.25, dotted: false },
  { string: 'q.', number: 4, value: 0.375, dotted: true },
  { string: 'h', number: 2, value: 0.5, dotted: false },
  { string: 'h.', number: 2, value: 0.75, dotted: true },
];

export const TIME_SIGNATURES: { [key: string]: number[] } = {
  4: [2, 3, 4, 5, 6, 7, 11],
  8: [2, 3, 5, 6, 7, 9, 10, 11, 12, 13],
  16: [13],
};
export const TIME_SIG_SPLITS: { [key: string]: number[] } = {
  1: [1],
  2: [2],
  3: [3],
  4: [2, 2],
  5: [2, 3],
  6: [3, 3],
  7: [2, 2, 3],
  8: [2, 2, 2, 2],
  9: [3, 3, 3],
  10: [3, 2, 2, 3],
  11: [3, 3, 3, 2],
  12: [3, 3, 3, 3],
  13: [3, 3, 3, 3, 1],
};

export const ROOT_NOTES: { [key: string]: number } = {
  'a': 0,
  'bb': 1,
  'b': 2,
  'cb': 2,
  'c': 3,
  'c#': 4,
  'db': 4,
  'd': 5,
  'eb': 6,
  'e': 7,
  'f': 8,
  'f#': 9,
  'gb': 9,
  'g': 10,
  'ab': 11,
};
export const NOTES: string[][] = [
  ['a', 'g##', 'bbb'],
  ['a#', 'bb', 'cbb'],
  ['b', 'a##', 'cb'],
  ['c', 'b#', 'dbb'],
  ['c#', 'db', 'b##'],
  ['d', 'c##', 'ebb'],
  ['d#', 'eb', 'fbb'],
  ['e', 'fb', 'd##'],
  ['f', 'e#', 'gbb'],
  ['f#', 'gb', 'e##'],
  ['g', 'f##', 'abb'],
  ['g#', 'ab'],
];

export type scale = {
  major: boolean;
  numericFormula: string[];
  intervallicFormula: number[];
  notes?: string[];
};
export const SCALES: { [key: string]: scale } = {
  ionian: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '5', '6', '7'],
    intervallicFormula: [2, 2, 1, 2, 2, 2, 1],
  },
  dorian: {
    major: false,
    numericFormula: ['1', '2', 'b3', '4', '5', '6', 'b7'],
    intervallicFormula: [2, 1, 2, 2, 2, 1, 2],
  },
  phrygian: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
    intervallicFormula: [1, 2, 2, 2, 1, 2, 2],
  },
  lydian: {
    major: true,
    numericFormula: ['1', '2', '3', '#4', '5', '6', '7'],
    intervallicFormula: [2, 2, 2, 1, 2, 2, 1],
  },
  mixolydian: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '5', '6', 'b7'],
    intervallicFormula: [2, 2, 1, 2, 2, 1, 2],
  },
  aeolian: {
    major: false,
    numericFormula: ['1', '2', 'b3', '4', '5', 'b6', 'b7'],
    intervallicFormula: [2, 1, 2, 2, 1, 2, 2],
  },
  locrian: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
    intervallicFormula: [1, 2, 2, 1, 2, 2, 2],
  },
  melodicMinor: {
    major: false,
    numericFormula: ['1', '2', 'b3', '4', '5', '6', '7'],
    intervallicFormula: [2, 1, 2, 2, 2, 2, 1],
  },
  dorianB2: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', '4', '5', '6', 'b7'],
    intervallicFormula: [1, 2, 2, 2, 2, 1, 2],
  },
  lydianAugmented: {
    major: true,
    numericFormula: ['1', '2', '3', '#4', '#5', '6', '7'],
    intervallicFormula: [2, 2, 2, 2, 1, 2, 1],
  },
  lydianDominant: {
    major: true,
    numericFormula: ['1', '2', '3', '#4', '5', '6', 'b7'],
    intervallicFormula: [2, 2, 2, 1, 2, 1, 2],
  },
  mixolydianB6: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '5', 'b6', 'b7'],
    intervallicFormula: [2, 2, 2, 1, 1, 2, 2],
  },
  aeolianB5: {
    major: false,
    numericFormula: ['1', '2', 'b3', '4', 'b5', 'b6', 'b7'],
    intervallicFormula: [2, 1, 2, 1, 2, 2, 2],
  },
  superLocrian: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
    intervallicFormula: [1, 2, 1, 2, 2, 2, 2],
  },
  harmonicMinor: {
    major: false,
    numericFormula: ['1', '2', 'b3', '4', '5', 'b6', '7'],
    intervallicFormula: [2, 1, 2, 2, 1, 3, 1],
  },
  locrianNatural6: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', '4', 'b5', '6', 'b7'],
    intervallicFormula: [1, 2, 2, 1, 3, 1, 2],
  },
  ionianSharp5: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '#5', '6', '7'],
    intervallicFormula: [2, 2, 1, 3, 1, 2, 1],
  },
  dorianSharp11: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', '#4', '5', '6', 'b7'],
    intervallicFormula: [1, 2, 3, 1, 2, 1, 2],
  },
  phrygianDominant: {
    major: true,
    numericFormula: ['1', 'b2', '3', '4', '5', 'b6', 'b7'],
    intervallicFormula: [1, 3, 1, 2, 1, 2, 2],
  },
  lydianSharp2: {
    major: true,
    numericFormula: ['1', '#2', '3', '#4', '5', '6', '7'],
    intervallicFormula: [3, 1, 2, 1, 2, 2, 1],
  },
  // TODO: Fix getNames for bb
  superLocrianbb7: {
    major: false,
    numericFormula: ['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'bb7'],
    intervallicFormula: [1, 2, 1, 2, 2, 1, 3],
  },
  minorPentatonic: {
    major: false,
    numericFormula: ['1', 'b3', '4', '5', 'b7'],
    intervallicFormula: [3, 2, 2, 3, 2],
  },
  majorPentatonic: {
    major: true,
    numericFormula: ['1', '2', '3', '5', '6'],
    intervallicFormula: [2, 2, 3, 2, 3],
  },
  diminished: {
    major: false,
    numericFormula: ['1', '2', 'b3', '4', 'b5', '#5', '6', '7'],
    intervallicFormula: [2, 1, 2, 1, 2, 1, 2, 1],
  },
  dominantDiminished: {
    major: true,
    numericFormula: ['1', 'b2', '#2', '3', '#4', '5', '6', 'b7'],
    intervallicFormula: [1, 2, 1, 2, 1, 2, 1, 2],
  },
  wholeTone: {
    major: true,
    numericFormula: ['1', '2', '3', '#4', '#5', '#6'],
    intervallicFormula: [2, 2, 2, 2, 2, 2],
  },
  majorBebop: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '5', '#5', '6', '7'],
    intervallicFormula: [2, 2, 1, 2, 1, 1, 2, 1],
  },
  minorBebop: {
    major: false,
    numericFormula: ['1', '2', 'b3', '3', '4', '5', '6', 'b7'],
    intervallicFormula: [2, 1, 1, 1, 2, 2, 1, 2],
  },
  dominantBebop: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '5', '6', 'b7', '7'],
    intervallicFormula: [2, 2, 1, 2, 2, 1, 1, 1],
  },
};
