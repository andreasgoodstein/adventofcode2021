export const day3part1 = (input: string[]) => {
  const sumList = Array<number>(input[0].length).fill(0);

  input.forEach((line) => {
    Array.from(line).forEach((char, index) => {
      if (char === "1") {
        sumList[index] += 1;
      }
    });
  });

  const gammaString = sumList.reduce(
    (rate: string, sum: number) =>
      `${rate}${sum > input.length / 2 ? "1" : "0"}`,
    ""
  );

  const epsilonString = Array.from(gammaString).reduce(
    (string, char) => `${string}${char === "1" ? "0" : "1"}`,
    ""
  );

  const gammaRate = parseInt(gammaString, 2);
  const epsilonRate = parseInt(epsilonString, 2);

  return gammaRate * epsilonRate;
};
