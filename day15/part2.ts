import graph from "https://cdn.skypack.dev/graphlib";

import { getEdgeList, getEdgeWeightMap, getGraph, getId } from "./part1.ts";

export const part2 = (input: string[]) => {
  const array = getArray(input);

  const edgeList = getEdgeList(array);

  const edgeWeight: Record<string, number> = getEdgeWeightMap(
    Object.keys(edgeList),
    array
  );

  const endCoordinate = getId(array.length - 1, array[0].length - 1);

  return (
    graph.alg.dijkstra(getGraph(edgeList), "0,0", ({ w }: { w: string }) => {
      return edgeWeight[w];
    }) as Record<string, { distance: number }>
  )[endCoordinate].distance;
};

const getArray = (input: string[]) => {
  const array = input.map((line) =>
    line.split("").map((char) => parseInt(char, 10))
  );

  const length = array.length;

  const result: number[][] = Array(length * 5)
    .fill(0)
    .map(() => Array(length * 5).fill(0));

  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      result[x][y] = array[x][y];

      for (let iX = 0; iX < 5; iX++) {
        for (let iY = 0; iY < 5; iY++) {
          if (iX === 0 && iY === 0) {
            continue;
          }

          const newValue = (array[x][y] + iX + iY) % 9 || 9;

          result[x + length * iX][y + length * iY] = newValue;
        }
      }
    }
  }

  return result;
};
