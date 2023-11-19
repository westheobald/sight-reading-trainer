import { TIME_SIG_SPLITS, RHYTHMS, rhythm } from './constants';
import { getRandomIndex } from './helpers';

export function generateRhythms(numBars: number, timeSignature: [number, number]): rhythm[][] {
  const rhythms = [];
  for (let _ = 0; _ < numBars; _++) {
    rhythms.push(generateOneBar(timeSignature));
  }
  return rhythms;
}

export function generateOneBar([numerator, denominator]: [number, number]): rhythm[] {
  const baseRhythmValue = RHYTHMS.find(rhythmObj => denominator == rhythmObj.number)?.value;
  const split = TIME_SIG_SPLITS[numerator];
  if (!split || !baseRhythmValue) throw Error('Time signature not valid.');
  let remaining = baseRhythmValue * numerator;

  const bar: rhythm[] = [];

  // TODO: Randomize split order? Reverse?
  if (split.length > 1) {
    for (const splitNumerator of split) {
      bar.push(...generateOneBar([splitNumerator, denominator]));
      remaining -= baseRhythmValue * splitNumerator;
    }
  } else {
    const possibleRhythms = Array.from(RHYTHMS);
    while (remaining != 0) {
      while (possibleRhythms[possibleRhythms.length - 1].value > remaining) {
        possibleRhythms.pop();
        if (possibleRhythms.length == 0) throw Error('Rhythm calculation error');
      }
      const rhythm = possibleRhythms[getRandomIndex(possibleRhythms.length)];
      bar.push(rhythm);
      remaining -= rhythm.value;
    }
  }
  return bar;
}
