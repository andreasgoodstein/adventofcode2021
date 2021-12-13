import { parse, foldCoordinateList } from "./part1.ts";
import { renderCoordinateList } from "./render.ts";

export const part2 = (input: string[]) => {
  const { coordinateList, foldList } = parse(input);

  const foldedCoordinateList = foldList.reduce(
    (foldedList, fold) => foldCoordinateList(foldedList, fold),
    coordinateList
  );

  return renderCoordinateList(foldedCoordinateList);
};
