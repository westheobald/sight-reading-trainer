export type rhythmKey = {
  string: string,
  number: number,
  value: number,
  dotted: boolean,
}
export const rhythmKey: rhythmKey[] = [
  { string: '16', number: 16, value: 0.0625, dotted: false },
  { string: '8', number: 8, value: 0.125, dotted: false },
  { string: '8.', number: 8, value: 0.1875, dotted: true },
  { string: 'q', number: 4, value: 0.25, dotted: false },
  { string: 'q.', number: 4, value: 0.375, dotted: true },
  { string: 'h', number: 2, value: 0.5, dotted: false },
  { string: 'h.', number: 2, value: 0.75, dotted: true },
];

export const timeSignatureKey: {[key:string]: number[]} = {
  4: [2,3,4,5,6,7,11],
  8: [2,3,5,6,7,9,10,11,12,13],
  16: [13]
};

export const timeSignatureSplit: {[key:string]: number[]} = {
  1: [1],
  2: [2],
  3: [3],
  4: [2,2],
  5: [2,3],
  6: [3,3],
  7: [2,2,3],
  8: [2,2,2,2],
  9: [3,3,3],
  10: [3,2,2,3],
  11: [3,3,3,2],
  12: [3,3,3,3],
  13: [3,3,3,3,1]
}
