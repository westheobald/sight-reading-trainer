import { MAX_RANGE, MIN_RANGE, NOTES, RHYTHMS, rhythm } from './constants';

export class Note {
  rhythm: string;
  ms: number;
  midiNote: number;
  noteName: string;

  constructor(midiNote: number, noteName: string, rhythm: string, ms: number) {
    this.rhythm = rhythm;
    this.ms = ms;
    this.midiNote = (function validateMidiNote(num) {
      if (!Number.isInteger(num) || num < MIN_RANGE || num > MAX_RANGE) {
        throw Error('Invalid MIDI note');
      }
      return num;
    })(midiNote);
    this.noteName = noteName;
  }
}
