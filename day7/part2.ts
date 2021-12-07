import { getNumbersBetweenMaxAndMin } from "./part1.ts";

const distanceMap = new Map<number, number>();

export const day7part2 = (input: string[]): number => {
  const crabs = input[0].split(",").map((number) => parseInt(number, 10));

  const positions = getNumbersBetweenMaxAndMin(crabs);

  return Math.min(...positions.map(sumDistanceDifference.bind(this, crabs)));
};

const sumDistanceDifference = (crabs: number[], position: number) =>
  crabs.reduce((sum, crab) => sum + getDistance(crab, position), 0);

const getDistance = (crab: number, position: number): number => {
  const diff = Math.abs(crab - position);

  if (distanceMap.has(diff)) {
    return distanceMap.get(diff)!;
  }

  let diffSum = 0;
  for (let i = diff; i > 0; i--) {
    diffSum += i;
  }

  distanceMap.set(diff, diffSum);

  return diffSum;
};
