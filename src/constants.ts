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

export type scale = {
  major: boolean;
  numericFormula: string[];
  intervallicFormula: number[];
  maxInterval: number;
  notes?: string[];
};
export const SCALES: { [key: string]: scale } = {
  major: {
    major: true,
    numericFormula: ['1', '2', '3', '4', '5', '6', '7'],
    intervallicFormula: [2, 2, 1, 2, 2, 2, 1],
    maxInterval: 2,
  },
  majorPentatonic: {
    major: true,
    numericFormula: ['1', '2', '3', '5', '6'],
    intervallicFormula: [2, 2, 3, 2, 3],
    maxInterval: 3,
  },
};

export const ROOT_NOTES: { [key: string]: number } = {
  'a': -3,
  'bb': -2,
  'b': -1,
  'cb': -1,
  'c': 0,
  'c#': 1,
  'db': 1,
  'd': 2,
  'eb': 3,
  'e': 4,
  'f': 5,
  'f#': 6,
  'gb': 6,
  'g': 7,
  'ab': 8,
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

export const MAX_TEMPO: number = 300;
export const MIN_TEMPO: number = 20;
export const MIN_RANGE: number = 21;
export const MAX_RANGE: number = 128;
export const MAX_INTERVAL: number = 8;
