import { TUNING_FREQUENCY } from './constants';

export class Note {
  rhythm: string;
  ms: number;
  midiNote: number;
  noteName: string;
  frequency: number;

  constructor(midiNote: number, noteName: string, rhythm: string, ms: number) {
    this.rhythm = rhythm;
    this.ms = ms;
    this.midiNote = midiNote;
    this.noteName = noteName;
    this.frequency = TUNING_FREQUENCY * 2 ** ((this.midiNote - 69) / 12); //TODO: Use hash table? performance
  }
}
