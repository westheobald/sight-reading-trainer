import { rhythm, ROOT_NOTES, scale } from './constants';
import { getRandomIndex } from './helpers';
import { Note } from './Note';

export function generateNotes(
  rhythms: rhythm[][],
  scale: scale,
  rootNote: string,
  range: [number, number],
  intervalSize: number,
): Note[][] {
  if (!scale.notes) throw Error('Invalid scale (no note names)');
  const notes = [];
  let previousNote, previousIndex;
  for (const bar of rhythms) {
    const barOfNotes = [];
    for (const rhythm of bar) {
      if (!rhythm.ms) throw Error('Invalid rhythm (ms)');
      if (previousNote == undefined || previousIndex == undefined) {
        [previousNote, previousIndex] = getStartingNote(scale, rootNote, range);
      } else {
        [previousNote, previousIndex] = getNextNote(
          scale,
          range,
          previousNote,
          previousIndex,
          intervalSize,
        );
      }
      barOfNotes.push(new Note(previousNote, scale.notes[previousIndex], rhythm.string, rhythm.ms));
    }
    notes.push(barOfNotes);
  }
  return notes;
}

function getStartingNote(
  scale: scale,
  rootNote: string,
  [lowRange, highRange]: [number, number],
): [number, number] {
  const scaleDegree = getRandomIndex(scale.intervallicFormula.length);
  const increase = scale.intervallicFormula
    .slice(0, scaleDegree + 1)
    .reduce((acc, curr) => acc + curr);
  let possibleNotes = [];
  for (let note = ROOT_NOTES[rootNote]; note <= highRange; note += increase) {
    if (note >= lowRange) possibleNotes.push(note);
  }
  return [possibleNotes[getRandomIndex(possibleNotes.length)], scaleDegree];
}

function getNextNote(
  scale: scale,
  [lowRange, highRange]: [number, number],
  previousNote: number,
  previousIndex: number,
  intervalSize: number,
) {
  const interval = getRandomIndex(intervalSize) + 1;
  const ascending = Boolean(Math.round(Math.random()));
  if (ascending) {
    var [increase, currentIndex] = getAscending();
    if (previousNote + increase > highRange) {
      [increase, currentIndex] = getDescending();
    }
  } else {
    var [increase, currentIndex] = getDescending();
    if (previousNote + increase < lowRange) {
      [increase, currentIndex] = getAscending();
    }
  }
  return [previousNote + increase, currentIndex];
  function getAscending() {
    let increase = 0;
    let index = previousIndex;
    for (let _ = 0; _ < interval; _++) {
      index = (index + 1) % scale.intervallicFormula.length;
      increase += scale.intervallicFormula[index];
    }
    return [increase, index];
  }
  function getDescending() {
    let increase = 0;
    let index = previousIndex;
    for (let _ = 0; _ < interval; _++) {
      index--;
      if (index == -1) index = scale.intervallicFormula.length - 1;
      increase -= scale.intervallicFormula[index];
    }
    return [increase, index];
  }
}
