import { input } from "./puzzle1.ts";

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

const solution = solve(input);

console.log(solution);
