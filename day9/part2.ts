import { isLocalMinimum, parseHeightArray } from "./part1.ts";

const MAX_VALUE = 9;

export const part2 = (input: string[]) => {
  const heightArray = parseHeightArray(input);

  const lowPoints = getLocalMinimumList(heightArray);

  const basinList = getBasinList(lowPoints, heightArray).sort((a, b) => b - a);

  return basinList
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, size) => sum * size, 1);
};

const getLocalMinimumList = (array: number[][]) => {
  const lowPoints: [number, number][] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const neighbors = getNeighbors(i, j, array).map(([x, y]) => array[x][y]);
      if (isLocalMinimum(array[i][j], neighbors)) {
        lowPoints.push([i, j]);
      }
    }
  }

  return lowPoints;
};

const getBasinList = (
  startingPoints: [number, number][],
  array: number[][]
): number[] => {
  const basinList: number[] = [];

  startingPoints.forEach(([x, y]) => {
    const basinNeighborMap = new Map<string, boolean>([[`${x},${y}`, true]]);

    const basinNeighborCount = getBasinNeighbors(x, y, array, basinNeighborMap);

    basinList.push(basinNeighborCount);
  });

  return basinList;
};

const getBasinNeighbors = (
  x: number,
  y: number,
  array: number[][],
  alreadySeenMap: Map<string, boolean>
): number => {
  const neighborsList: [number, number][] = [];

  let result = 1;
  let nextX = x;
  let nextY = y;

  while (nextX > -1 && nextY > -1) {
    const newNeighborsList = getNeighbors(nextX, nextY, array).filter(
      ([x, y]) => !alreadySeenMap.has(`${x},${y}`)
    );

    newNeighborsList.forEach(([x, y]) => {
      alreadySeenMap.set(`${x},${y}`, true);
      neighborsList.push([x, y]);
      result += 1;
    });

    const [newX, newY] = neighborsList.shift() || [-1, -1];
    nextX = newX;
    nextY = newY;
  }

  return result;
};

const getNeighbors = (
  x: number,
  y: number,
  array: number[][]
): [number, number][] => {
  const result: [number, number][] = [];

  if (x > 0 && array[x - 1][y] < MAX_VALUE) {
    result.push([x - 1, y]);
  }
  if (x < array.length - 1 && array[x + 1][y] < MAX_VALUE) {
    result.push([x + 1, y]);
  }
  if (y > 0 && array[x][y - 1] < MAX_VALUE) {
    result.push([x, y - 1]);
  }
  if (y < array[x].length - 1 && array[x][y + 1] < MAX_VALUE) {
    result.push([x, y + 1]);
  }

  return result;
};
