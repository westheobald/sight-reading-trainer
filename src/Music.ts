import { Note } from './Note';
import {
  MAX_RANGE,
  MAX_SCALE_STEPS,
  MAX_TEMPO,
  MIN_RANGE,
  MIN_TEMPO,
  NOTES,
  RHYTHMS,
  ROOT_NOTES,
  SCALES,
  TIME_SIGNATURES,
  rhythm,
  scale,
} from './constants';
import { generateNotes } from './generate-notes';
import { generateRhythms } from './generate-rhythm';

export type MusicSettings = {
  rootNote: string;
  scaleKey: string;
  tempo: number;
  timeSignature: [number, number];
  range: [number, number];
  maxScaleSteps: number;
};
export class Music {
  melody: Note[][];
  rootNote: string;
  scale: scale;
  keySignature: string;
  tempo: number;
  timeSignature: [number, number];
  rhythms: rhythm[];
  range: [number, number];
  maxScaleSteps: number;

  constructor({ rootNote, scaleKey, tempo, timeSignature, range, maxScaleSteps }: MusicSettings) {
    this.rootNote = (function validateRootNote() {
      if (!ROOT_NOTES.hasOwnProperty(rootNote)) throw Error('Invalid root note');
      return rootNote;
    })();

    this.scale = (function validateScale() {
      const scale = SCALES[scaleKey];
      if (!scale) throw Error('Invalid scale');
      return scale;
    })();

    this.keySignature = (function getKeySignature(scale) {
      let keySignature = rootNote;
      if (!scale.major) keySignature += 'm';
      return keySignature;
    })(this.scale);

    this.tempo = (function validateTempo() {
      if (!Number.isInteger(tempo) || tempo < MIN_TEMPO || tempo > MAX_TEMPO) {
        throw Error('Invalid tempo');
      }
      return tempo;
    })();

    this.timeSignature = (function validateTimeSignature() {
      const [numerator, denominator] = timeSignature;
      if (!TIME_SIGNATURES[denominator] || !TIME_SIGNATURES[denominator].includes(numerator)) {
        throw Error('Invalid time signature');
      }
      return timeSignature;
    })();

    this.rhythms = (function getRhythms(tempo, [, denominator]) {
      const baseRhythm = RHYTHMS.find((rhythm) => rhythm.number == denominator && !rhythm.dotted);
      if (!baseRhythm) throw Error('Invalid rhythm (time signature)');
      const baseRhythmInMs = 60_000 / tempo;
      const rhythms: rhythm[] = Array.from(RHYTHMS);
      for (const rhythm of rhythms) {
        rhythm.ms = (baseRhythmInMs * rhythm.value) / baseRhythm.value;
      }
      return rhythms;
    })(this.tempo, this.timeSignature);

    this.maxScaleSteps = (function validateIntervalSize(scale) {
      if (
        !Number.isInteger(maxScaleSteps) ||
        maxScaleSteps < 1 ||
        maxScaleSteps > scale.numericFormula.length // TODO: limits max interval to octave, allow greater?
      ) {
        throw Error('Invalid interval size');
      }
      return maxScaleSteps;
    })(this.scale);

    this.range = (function validateRange(scale, maxScaleSteps) {
      const [minRange, maxRange] = range;
      if (minRange < MIN_RANGE || maxRange > MAX_RANGE || minRange > maxRange) {
        throw Error('Invalid range');
      }
      if (maxScaleSteps * scale.maxInterval > Math.floor((maxRange - minRange + 1) / 2) * 12) {
        throw Error('Invalid range (maxScaleSteps/range)');
      }
      return range;
    })(this.scale, this.maxScaleSteps);

    this.scale.notes = (function getNotes(rootNote, scale) {
      const musicAlphabet = 'abcdefg';
      let alphabetIndex = musicAlphabet.indexOf(rootNote[0]);

      const notes = new Array(scale.numericFormula.length);
      let noteIndex = NOTES.findIndex((arr) => arr.includes(rootNote));
      notes[0] = rootNote;

      let previousNumber = 1;
      for (let i = 1; i < scale.numericFormula.length; i++) {
        const num = Number(scale.numericFormula[i].at(-1));
        if (num > previousNumber) {
          alphabetIndex = (alphabetIndex + num - previousNumber) % musicAlphabet.length;
          previousNumber = num;
        }
        noteIndex = (noteIndex + scale.intervallicFormula[i - 1]) % NOTES.length;
        notes[i] = NOTES[noteIndex].find((note) => note[0] == musicAlphabet[alphabetIndex]);
      }
      return notes;
    })(this.rootNote, this.scale);

    this.melody = [];
  }
  generateMelody(numBars: number) {
    const rhythms = generateRhythms(numBars, this.timeSignature, this.rhythms);
    const notes = generateNotes(rhythms, this.scale, this.rootNote, this.range, this.maxScaleSteps);
    this.melody = notes;
  }
}
