import {
  MAX_INTERVAL,
  MAX_RANGE,
  MAX_TEMPO,
  MIN_RANGE,
  MIN_TEMPO,
  NOTES,
  ROOT_NOTES,
  SCALES,
  TIME_SIGNATURES,
  TIME_SIG_SPLITS,
  scale,
} from './constants';

type MusicType = {
  rootNote: string;
  scale: string;
  tempo: number;
  timeSignature: [number, number];
  range: [number, number];
  intervalSize: number;
};
export class Music {
  melody: [];
  rootNote: string;
  scale: scale;
  keySignature: string;
  notes: string[];
  tempo: number;
  timeSignature: [number, number];
  timeSignatureSplit: number[];
  range: [number, number];
  intervalSize: number;

  constructor({ rootNote, scale, tempo, timeSignature, range, intervalSize }: MusicType) {
    this.rootNote = Music.validateRootNote(rootNote);
    this.scale = Music.validateScale(scale);
    this.keySignature = Music.getKeySignature(this.rootNote, this.scale);
    this.notes = Music.getNotes(this.rootNote, this.scale);
    this.tempo = Music.validateTempo(tempo);
    this.timeSignature = Music.validateTimeSignature(timeSignature);
    this.timeSignatureSplit = TIME_SIG_SPLITS[this.timeSignature[0]];
    this.range = Music.validateRange(range);
    this.intervalSize = Music.validateIntervalSize(intervalSize, this.scale);
    this.melody = [];
  }
  static validateRootNote(rootNote: string): string {
    if (!ROOT_NOTES.hasOwnProperty(rootNote)) {
      throw Error('Invalid root note');
    }
    return rootNote;
  }
  static validateScale(scaleKey: string): scale {
    const scale = SCALES[scaleKey];
    if (!scale) throw Error('Invalid scale');
    return scale;
  }
  static getKeySignature(rootNote: string, scale: scale): string {
    if (!scale.major) rootNote += 'm';
    return rootNote;
  }
  static getNotes(rootNote: string, scale: scale): string[] {
    const musicAlphabet = 'abcdefg';
    let alphabetIndex = musicAlphabet.indexOf(rootNote[0]);
    let noteIndex = NOTES.findIndex((arr) => arr.includes(rootNote));
    const notes = new Array(NOTES.length);
    notes[noteIndex] = rootNote;

    let previousNumber = 1;
    for (let i = 1; i < scale.numericFormula.length; i++) {
      const numStr = scale.numericFormula[i].at(-1);
      if (numStr == undefined) throw Error('Invalid scale formula');
      const num = +numStr;
      if (num > previousNumber) {
        alphabetIndex = (alphabetIndex + (num - previousNumber)) % 7;
        previousNumber = num;
      }
      noteIndex = (noteIndex + scale.intervallicFormula[i]) % NOTES.length;
      notes[noteIndex] = NOTES[noteIndex].find((note) => note[0] == musicAlphabet[alphabetIndex]);
    }
    return notes;
  }
  static validateTempo(tempo: number): number {
    if (!Number.isInteger(tempo) || tempo < MIN_TEMPO || tempo > MAX_TEMPO) {
      throw Error('Invalid tempo');
    }
    return tempo;
  }
  static validateTimeSignature(timeSignature: [number, number]): [number, number] {
    const [numerator, denominator] = timeSignature;
    if (!TIME_SIGNATURES[denominator] || !TIME_SIGNATURES[denominator].includes(numerator)) {
      throw Error('Invalid time signature');
    }
    return timeSignature;
  }
  static validateRange(range: [number, number]): [number, number] {
    const [minRange, maxRange] = range;
    if (minRange < MIN_RANGE || maxRange > MAX_RANGE || maxRange - minRange < 12) {
      throw Error('Invalid range');
    }
    return range;
  }
  static validateIntervalSize(intervalSize: number, scale: scale): number {
    if (intervalSize < 2 || intervalSize < scale.maxInterval || intervalSize > MAX_INTERVAL) {
      throw Error('Invalid interval size');
    }
    return intervalSize;
  }
}
