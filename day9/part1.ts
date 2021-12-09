export const part1 = (input: string[]) => {
  const heightArray = parseHeightArray(input);

  const lowPoints = getLocalMinimumList(heightArray);

  return lowPoints.reduce((sum, value) => sum + value + 1, 0);
};

export const parseHeightArray = (input: string[]) =>
  input.map((line) => line.split("").map((char) => parseInt(char, 10)));

const getLocalMinimumList = (array: number[][]) => {
  const lowPoints = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (isLocalMinimum(array[i][j], getNeighbors(i, j, array))) {
        lowPoints.push(array[i][j]);
      }
    }
  }

  return lowPoints;
};

export const getNeighbors = (x: number, y: number, array: number[][]) => {
  const result = [];

  if (x > 0) {
    result.push(array[x - 1][y]);
  }
  if (x < array.length - 1) {
    result.push(array[x + 1][y]);
  }
  if (y > 0) {
    result.push(array[x][y - 1]);
  }
  if (y < array[x].length - 1) {
    result.push(array[x][y + 1]);
  }

  return result;
};

export const isLocalMinimum = (value: number, neighbors: number[]) =>
  neighbors.every((neighbor) => neighbor > value);
