import { REPEATED_NOTE_PERCENTAGE, rhythm, ROOT_NOTES, scale } from './constants';
import { getRandomIndex, getRandomInterval } from './helpers';
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

export function getStartingNote(
  scale: scale,
  rootNote: string,
  [lowRange, highRange]: [number, number],
): [number, number] {
  const scaleDegree = getRandomIndex(scale.intervallicFormula.length);
  const increase = scale.intervallicFormula
    .slice(0, scaleDegree)
    .reduce((acc, curr) => acc + curr, 0);
  let possibleNotes = [];
  for (let note = ((ROOT_NOTES[rootNote] + increase) % 12) + 21; note <= highRange; note += 12) {
    if (note >= lowRange) possibleNotes.push(note);
  }
  return [possibleNotes[getRandomIndex(possibleNotes.length)], scaleDegree];
}

export function getNextNote(
  scale: scale,
  [lowRange, highRange]: [number, number],
  previousNote: number,
  previousIndex: number,
  maxInterval: number,
) {
  const interval = getRandomInterval(maxInterval); // returns [1, maxInterval] inclusive
  if (Math.random() < REPEATED_NOTE_PERCENTAGE) return [previousNote, previousIndex];
  const ascending = Boolean(Math.round(Math.random()));
  let repeated = false;
  if (ascending) {
    [previousNote, previousIndex] = getAscending(previousNote, previousIndex, interval);
  } else [previousNote, previousIndex] = getDescending(previousNote, previousIndex, interval);
  return [previousNote, previousIndex];

  function getAscending(
    previousNote: number,
    previousIndex: number,
    interval: number,
  ): [number, number] {
    let index = previousIndex;
    let increase = 0;
    for (let i = 0; i < interval; i++) {
      increase += scale.intervallicFormula[index];
      index = (index + 1) % scale.intervallicFormula.length;
    }
    if (previousNote + increase > highRange) {
      if (repeated) getDescending(previousNote, previousIndex, interval - 1);
      repeated = true;
      return getDescending(previousNote, previousIndex, interval);
    }
    return [previousNote + increase, index];
  }
  function getDescending(
    previousNote: number,
    previousIndex: number,
    interval: number,
  ): [number, number] {
    let index = previousIndex;
    let change = 0;
    for (let i = 0; i < interval; i++) {
      index = index - 1 >= 0 ? index - 1 : scale.intervallicFormula.length - 1;
      change += scale.intervallicFormula[index];
    }
    if (previousNote - change < lowRange) {
      if (repeated) getAscending(previousNote, previousIndex, interval - 1);
      repeated = true;
      return getAscending(previousNote, previousIndex, interval);
    }
    return [previousNote - change, index];
  }
}
