import { SCALES, ROOT_NOTES } from './constants';

export class Scale {
  numericFormula: string[];
  intervallicFormula: number[];
  maxInterval: number;
  rootNote: string;

  constructor(scaleName: string, rootNote: string) {
    const scale = SCALES[scaleName];
    if (!scale) throw Error('Invalid scale');
    ({
      numericFormula: this.numericFormula,
      intervallicFormula: this.intervallicFormula,
      maxInterval: this.maxInterval,
    } = scale);

    this.rootNote = (function validateRootNote(root) {
      if (ROOT_NOTES.hasOwnProperty(root)) return root;
      throw Error('Invalid root note');
    })(rootNote);
  }
}
