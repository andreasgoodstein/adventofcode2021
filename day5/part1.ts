import { Coord, Line, parseLines } from "./parser.ts";

export const day5part1 = (input: string[]): number => {
  const lineList = parseLines(input);

  const straightLines = lineList.filter(
    (line) => line.start.x === line.end.x || line.start.y === line.end.y
  );

  const coordinateList = straightLines.map(getPointsOnLine).flat();

  return countOverlappingCoordinates(coordinateList);
};

const getPointsOnLine = (line: Line): Coord[] => {
  const result = [];

  const xDiff = line.end.x - line.start.x;
  const yDiff = line.end.y - line.start.y;

  if (xDiff !== 0) {
    const increment = xDiff > 0 ? -1 : 1;
    for (let i = xDiff; i !== 0 + increment; i += increment) {
      const coord = { x: line.start.x + i, y: line.start.y };
      result.push(coord);
    }
  }

  if (yDiff !== 0) {
    const increment = yDiff > 0 ? -1 : 1;
    for (let i = yDiff; i !== 0 + increment; i += increment) {
      const coord = { y: line.start.y + i, x: line.start.x };
      result.push(coord);
    }
  }

  return result;
};

export const countOverlappingCoordinates = (
  coordinateList: Coord[]
): number => {
  const coordMap = new Map<string, number>();

  coordinateList.forEach((coord) => {
    const key = `${coord.x},${coord.y}`;

    const coordValue = coordMap.has(key) ? coordMap.get(key)! : 0;

    coordMap.set(key, coordValue + 1);
  });

  return Array.from(coordMap.values()).filter((value) => value > 1).length;
};
