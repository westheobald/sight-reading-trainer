import { Music, MusicSettings } from '../src/Music';
import { ROOT_NOTES, SCALES, NOTES } from '../src/constants';
import { getNextNote, getStartingNote } from '../src/generate-notes';

const iterations = 10;
test('getStartingNote', () => {
  for (const scaleStr in SCALES) {
    for (const root in ROOT_NOTES) {
      const ranges: [number, number][] = [
        [21, 33],
        [116, 128],
        [21, 128],
      ];
      for (const range of ranges) {
        const options: MusicSettings = {
          scaleKey: scaleStr,
          rootNote: root,
          tempo: 120,
          timeSignature: [4, 4],
          range: range,
          maxScaleSteps: 4,
        };
        const music = new Music(options);
        if (!music.scale.notes) throw Error();
        let notes = new Set();
        for (let i = 0; i < iterations * 10; i++) {
          const [startingNote, startingIndex] = getStartingNote(
            music.scale,
            music.rootNote,
            music.range,
          );
          expect(
            NOTES[(startingNote - 21) % 12].includes(music.scale.notes[startingIndex]),
          ).toBeTruthy();
          notes.add(music.scale.notes[startingIndex]);
        }
        for (const note of music.scale.notes) {
          expect(notes.has(note)).toBeTruthy();
        }
      }
    }
  }
});
test('getNextNote', () => {
  for (const scaleStr in SCALES) {
    for (const root in ROOT_NOTES) {
      const ranges: [number, number][] = [
        [21, 33],
        [116, 128],
        [21, 128],
      ];
      for (const range of ranges) {
        const options: MusicSettings = {
          scaleKey: scaleStr,
          rootNote: root,
          tempo: 120,
          timeSignature: [4, 4],
          range: range,
          maxScaleSteps: 1,
        };
        const music = new Music(options);
        let [previousNote, previousIndex] = getStartingNote(
          music.scale,
          music.rootNote,
          music.range,
        );
        for (let i = 0; i < iterations; i++) {
          const [note, index] = getNextNote(
            music.scale,
            music.range,
            previousNote,
            previousIndex,
            music.maxScaleSteps,
          );
          if (index == previousIndex) {
            expect(
              note == previousNote || note == previousNote + 12 || note == previousNote - 12,
            ).toBeTruthy();
          } else if (note > previousNote) {
            if (index > previousIndex) {
              const increase = music.scale.intervallicFormula
                .slice(previousIndex, index)
                .reduce((acc, curr) => acc + curr, 0);
              expect(previousNote + increase).toBe(note);
            } else {
              const newArr = [
                ...music.scale.intervallicFormula.slice(previousIndex),
                ...music.scale.intervallicFormula.slice(0, index),
              ];
              expect(previousNote + newArr.reduce((acc, curr) => acc + curr, 0)).toBe(note);
            }
          } else {
            if (index < previousIndex) {
              const decrease = music.scale.intervallicFormula.slice(index, previousIndex);
              expect(previousNote - decrease.reduce((acc, curr) => acc + curr, 0)).toBe(note);
            } else {
              const newArr = [
                ...music.scale.intervallicFormula.slice(0, previousIndex),
                ...music.scale.intervallicFormula.slice(index),
              ];
              expect(previousNote - newArr.reduce((acc, curr) => acc + curr, 0)).toBe(note);
            }
          }
        }
      }
    }
  }
});
test('generateNotes', () => {
  for (const scale in SCALES) {
    for (const root in ROOT_NOTES) {
      const ranges: [number, number][] = [
        [21, 33],
        [116, 128],
        [21, 128],
      ];
      for (const range of ranges) {
        const options: MusicSettings = {
          scaleKey: scale,
          rootNote: root,
          timeSignature: [4, 4],
          tempo: 120,
          range: range,
          maxScaleSteps: 2,
        };
        const music = new Music(options);
        music.generateMelody(iterations);
        for (const bar of music.melody) {
          for (const note of bar) {
            expect(NOTES[(note.midiNote - 21) % 12].includes(note.noteName)).toBeTruthy();
          }
        }
      }
    }
  }
});
