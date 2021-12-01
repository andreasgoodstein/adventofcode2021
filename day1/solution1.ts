import { testInput1 } from "./testInput1";

const solve = (input: number[]): number => {
  let result = 0;

  for (let n = 0; n < input.length - 1; n += 1) {
    const m = n + 1;

    if (input[m] > input[n]) {
      result += 1;
    }
  }

  return result;
};

const solution = solve(testInput1);

console.log(solution);
