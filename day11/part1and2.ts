import { getCoordId } from "../helper.ts";

const END_STEP = 100;
const MAX_SYNC_STEP = 1000;

let flashCount = 0;
export const part1 = (input: string[]) => {
  const array = input.map((line) =>
    line.split("").map((char) => parseInt(char, 10))
  );

  for (let i = 0; i < END_STEP; i++) {
    incrementStep(array);
  }

  return flashCount;
};

let flashSync = false;
export const part2 = (input: string[]) => {
  const array = input.map((line) =>
    line.split("").map((char) => parseInt(char, 10))
  );

  for (let i = 1; i < MAX_SYNC_STEP; i++) {
    incrementStep(array);
    if (flashSync) {
      return i;
    }
  }

  return -1;
};

const incrementStep = (array: number[][]) => {
  const flashingSet = new Set<string>();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      increaseEnergy(i, j, array, flashingSet);
    }
  }

  if (flashingSet.size === 100) {
    flashSync = true;
  }

  resetFlashedSquids(flashingSet, array);
};

const increaseEnergy = (
  x: number,
  y: number,
  array: number[][],
  set: Set<string>
) => {
  array[x][y] += 1;

  const coordId = getCoordId(x, y);

  if (array[x][y] === 10 && !set.has(coordId)) {
    set.add(coordId);
    triggerFlash(x, y, array, set);
    flashCount += 1;
  }
};

const triggerFlash = (
  x: number,
  y: number,
  array: number[][],
  set: Set<string>
) => {
  const neighborList = getNeighborList(x, y, array);

  neighborList.forEach(([a, b]) => {
    increaseEnergy(a, b, array, set);
  });
};

const getNeighborList = (x: number, y: number, array: number[][]) => {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].filter(
    ([x, y]) => x > -1 && y > -1 && x < array.length && y < array[x].length
  );
};

const resetFlashedSquids = (set: Set<string>, array: number[][]) => {
  Array.from(set).forEach((id) => {
    const [x, y] = getCoordFromId(id);

    array[x][y] = 0;
  });
};

const getCoordFromId = (id: string) =>
  id.split(",").map((char) => parseInt(char, 10)) as [number, number];
