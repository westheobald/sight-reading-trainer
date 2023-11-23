import { Music } from '../src/Music';
import { NOTES, ROOT_NOTES, SCALES } from '../src/constants';
import { getStartingNote } from '../src/generate-notes';

describe('getStartingNote Test', () => {
  test('Ensure possible notes (C Major)', () => {
    for (const scaleStr in SCALES) {
      for (const root in ROOT_NOTES) {
        const scale = SCALES[scaleStr];
        // scaleDegree = 0-root, 1-2nd, 2-3rd, ..., 6-7th 
      }}
  });
});
