export function getRandomIndex(elCount: number): number {
  return Math.floor(Math.random() * elCount);
}

export function getRandomInterval(maxInterval: number): number {
  return Math.floor(Math.random() * maxInterval + 1);
}
