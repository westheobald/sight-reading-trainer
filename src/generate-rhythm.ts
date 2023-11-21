import { TIME_SIG_SPLITS, RHYTHMS, rhythm } from './constants';
import { getRandomIndex } from './helpers';

export function generateRhythms(
  numBars: number,
  timeSignature: [number, number],
  defaultRhythms: rhythm[],
): rhythm[][] {
  const rhythms = [];
  for (let _ = 0; _ < numBars; _++) {
    rhythms.push(generateOneBar(timeSignature, defaultRhythms));
  }
  return rhythms;
}

export function generateOneBar(
  [numerator, denominator]: [number, number],
  rhythms: rhythm[],
): rhythm[] {
  const baseRhythmValue = RHYTHMS.find((rhythmObj) => denominator == rhythmObj.number)?.value;
  const split = TIME_SIG_SPLITS[numerator];
  if (!split || !baseRhythmValue) throw Error('Time signature not valid.');
  let remaining = baseRhythmValue * numerator;

  const bar: rhythm[] = [];

  // TODO: Randomize split order? Reverse?
  if (split.length > 1) {
    for (const splitNumerator of split) {
      bar.push(...generateOneBar([splitNumerator, denominator], rhythms));
      remaining -= baseRhythmValue * splitNumerator;
    }
  } else {
    let allowedValues = rhythms.length;
    while (remaining != 0) {
      while (rhythms[allowedValues - 1].value > remaining) {
        allowedValues--;
        if (allowedValues == 0) throw Error('Rhythm calculation error');
      }
      const currentRhythm = rhythms[getRandomIndex(allowedValues)];
      bar.push(currentRhythm);
      remaining -= currentRhythm.value;
    }
  }
  return bar;
}
