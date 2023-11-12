import { timeSignatureSplit, rhythmKey } from "./constants";
import { getRandomIndex } from "./helpers";

export function generateRhythms(numBars: number, timeSignature: [number, number]): [string, number][][] {
  const rhythms = [];
  for (let _ = 0; _ < numBars; _++) {
    rhythms.push(generateOneBar(timeSignature));
  }
  return rhythms;
}

export function generateOneBar([numerator, denominator]: [number, number]): [string, number][] {
  const minRhythmVal = rhythmKey.find(([str]) => {
    if (str == 'q') str = '4';
    if (str == 'h') str = '2';
    if (+str == denominator) return true;
  });
  const split = timeSignatureSplit[numerator];
  if (!split || !minRhythmVal) throw Error('Time signature not valid.');
  let remaining = minRhythmVal[1] * numerator;

  const bar: [string, number][] = [];

  // TODO: Randomize split order? Reverse?
  if (split.length > 1) {
    for (const splitNumerator of split) {
      bar.push(...generateOneBar([splitNumerator, denominator]));
      remaining -= minRhythmVal[1] * splitNumerator;
    }
  } else {
    const possibleRhythms = Array.from(rhythmKey);
    while (remaining != 0) {
      while (possibleRhythms[possibleRhythms.length - 1][1] > remaining) {
        possibleRhythms.pop();
        if (possibleRhythms.length == 0) throw Error('Rhythm calculation error');
      }
      const rhythm = possibleRhythms[getRandomIndex(possibleRhythms.length)];
      bar.push(rhythm);
      remaining -= rhythm[1];
    }
  }
  return bar;
}
