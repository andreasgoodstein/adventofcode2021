type Entry = [string[], string[]];

export const KNOWN_LENGTH_MAP = new Map([
  [2, 1],
  [3, 7],
  [4, 4],
  [7, 8],
]);

export const part1 = (input: string[]) => {
  const entryList = parseInput(input);

  return entryList
    .map(([_, outputs]) =>
      outputs.filter((output) => KNOWN_LENGTH_MAP.has(output.length))
    )
    .flat().length;
};

export const parseInput = (input: string[]): Entry[] =>
  input.map((line) => {
    const [signals, outputs] = line.split(" | ");
    return [signals.split(" "), outputs.split(" ")];
  });
