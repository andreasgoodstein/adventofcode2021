import { day1part1 as countIncreasingSums } from "./solution1.ts";

export const day1part2 = (input: number[]): number => {
  const sumList = input.map((_, index) =>
    input.slice(index, index + 3).reduce((sum, number) => sum + number, 0)
  );

  return countIncreasingSums(sumList.slice(0, sumList.length - 2));
};
