import { Coord, Line, parseLines } from "./parser.ts";
import { countOverlappingCoordinates } from "./part1.ts";

export const day5part2 = (input: string[]): number => {
  const lineList = parseLines(input);

  const coordinateList = lineList.map(getCoordinateList).flat();

  return countOverlappingCoordinates(coordinateList);
};

const getCoordinateList = (line: Line): Coord[] => {
  const result = [];

  const xDiff = line.end.x - line.start.x;
  const yDiff = line.end.y - line.start.y;

  if (xDiff !== 0 && yDiff !== 0) {
    const xIncrement = xDiff > 0 ? -1 : 1;
    const yIncrement = yDiff > 0 ? -1 : 1;
    for (
      let i = xDiff, j = yDiff;
      i !== 0 + xIncrement || j !== 0 + yIncrement;
      i += xIncrement, j += yIncrement
    ) {
      const coord = { x: line.start.x + i, y: line.start.y + j };
      result.push(coord);
    }
  } else if (xDiff !== 0) {
    const increment = xDiff > 0 ? -1 : 1;
    for (let i = xDiff; i !== 0 + increment; i += increment) {
      const coord = { x: line.start.x + i, y: line.start.y };
      result.push(coord);
    }
  } else if (yDiff !== 0) {
    const increment = yDiff > 0 ? -1 : 1;
    for (let i = yDiff; i !== 0 + increment; i += increment) {
      const coord = { y: line.start.y + i, x: line.start.x };
      result.push(coord);
    }
  }

  return result;
};
