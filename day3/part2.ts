export const day3part2 = (input: string[]) => {
  const gamma = getFilteredInputList(input, 0, true);
  const epsilon = getFilteredInputList(input, 0, false);

  const gammaRate = parseInt(gamma[0], 2);
  const epsilonRate = parseInt(epsilon[0], 2);

  return gammaRate * epsilonRate;
};

const getFilteredInputList = (
  input: string[],
  index: number,
  isGamma: boolean
): string[] => {
  if (input.length < 2) {
    return input;
  }

  const mostCommonValue = findMostCommonValueAtIndex(input, index);

  const filterMask = isGamma
    ? mostCommonValue >= 0
      ? "1"
      : "0"
    : mostCommonValue >= 0
    ? "0"
    : "1";

  const filteredInputList = input.filter((line) =>
    filterOnCharAtIndex(line, index, filterMask)
  );

  return getFilteredInputList(filteredInputList, index + 1, isGamma);
};

const findMostCommonValueAtIndex = (input: string[], index: number): number =>
  input.reduce(
    (value, line) => (line.charAt(index) === "1" ? value + 1 : value - 1),
    0
  );

const filterOnCharAtIndex = (
  input: string,
  index: number,
  mask: string
): boolean => input.charAt(index) === mask;
