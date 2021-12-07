export const day7part1 = (input: string[]) => {
  const crabs = input[0].split(",").map((number) => parseInt(number, 10));

  const positions = getNumbersBetweenMaxAndMin(crabs);

  const sumDistances = positions.map((position) =>
    sumDistanceDifference(crabs, position)
  );

  return Math.min(...sumDistances);
};

export const getNumbersBetweenMaxAndMin = (numbers: number[]): number[] => {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  const diff = max - min;

  return new Array<number>(diff + 1).fill(0).map((_, index) => index + min);
};

const sumDistanceDifference = (crabs: number[], position: number) =>
  crabs.reduce((sum, crab) => Math.abs(crab - position) + sum, 0);
