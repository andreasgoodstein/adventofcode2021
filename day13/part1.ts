import { getCoordId } from "../helper.ts";
import { renderCoordinateList } from "./render.ts";

export type Fold = {
  axis: string;
  value: number;
};

export const parse = (input: string[]) => {
  const coordinateList: Array<[number, number]> = [];
  const foldList: Array<Fold> = [];

  input.forEach((line) => {
    if (!line) {
      return;
    }

    if (line.includes(",")) {
      const [x, y] = line.split(",");
      coordinateList.push([parseInt(x, 10), parseInt(y, 10)]);
    }

    if (line.includes("fold along")) {
      const fold = line.replace("fold along ", "").split("=");
      foldList.push({ axis: fold[0], value: parseInt(fold[1], 10) });
    }
  });

  return { coordinateList, foldList };
};

export const part1 = (input: string[]) => {
  const { coordinateList, foldList } = parse(input);

  const foldedCoordinateList = foldCoordinateList(coordinateList, foldList[0]);

  return foldedCoordinateList.length;
};

export const foldCoordinateList = (
  coordinateList: Array<[number, number]>,
  fold: Fold
): Array<[number, number]> => {
  const seenCoordinates = new Set<string>();
  const newCoordinateList = new Array<[number, number]>();

  coordinateList.forEach(([x, y]) => {
    const newCoordinate = getNewCoordinate(fold, x, y);

    const newCoordinateId = getCoordId(newCoordinate[0], newCoordinate[1]);

    if (
      seenCoordinates.has(newCoordinateId) ||
      coordinateIsInvalid(newCoordinate[0], newCoordinate[1])
    ) {
      return;
    }

    newCoordinateList.push([newCoordinate[0], newCoordinate[1]]);
    seenCoordinates.add(newCoordinateId);
  });

  return newCoordinateList;
};

const getNewCoordinate = (fold: Fold, x: number, y: number) => {
  if (fold.axis === "x" && x > fold.value) {
    const foldDistance = x - fold.value;
    return [x - foldDistance * 2, y];
  }

  if (fold.axis === "y" && y > fold.value) {
    const foldDistance = y - fold.value;
    return [x, y - foldDistance * 2];
  }

  return [x, y];
};

const coordinateIsInvalid = (x: number, y: number): boolean => x < 0 || y < 0;
