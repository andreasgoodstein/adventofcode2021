import { KNOWN_LENGTH_MAP, parseInput } from "./part1.ts";

const ALL_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

type OutputMap = Record<number, Set<number>>;
const OUTPUT_MAP: OutputMap = {
  0: new Set([1, 2, 3, 5, 6, 7]),
  1: new Set([3, 6]),
  2: new Set([1, 3, 4, 5, 7]),
  3: new Set([1, 3, 4, 6, 7]),
  4: new Set([2, 3, 4, 6]),
  5: new Set([1, 2, 4, 6, 7]),
  6: new Set([1, 2, 4, 5, 6, 7]),
  7: new Set([1, 3, 6]),
  8: new Set([1, 2, 3, 4, 5, 6, 7]),
  9: new Set([1, 2, 3, 4, 6, 7]),
};

type WireMap = Record<string, Set<number>>;
const INITIAL_WIRE_MAP: WireMap = {
  a: new Set(ALL_OPTIONS),
  b: new Set(ALL_OPTIONS),
  c: new Set(ALL_OPTIONS),
  d: new Set(ALL_OPTIONS),
  e: new Set(ALL_OPTIONS),
  f: new Set(ALL_OPTIONS),
  g: new Set(ALL_OPTIONS),
};

export const part2 = (input: string[]) => {
  const entryList = parseInput(input);

  let result = 0;
  entryList.forEach(([signalList, outputList]) => {
    const wireMap = decodeWireMap(signalList, KNOWN_LENGTH_MAP, {
      ...INITIAL_WIRE_MAP,
    });

    if (!wireMap) {
      console.error("Invalid WireMap");
      return;
    }

    const decodedOutput = outputList.map((output) =>
      output
        .split("")
        .map((char) => wireMap[char].keys().next().value as number)
    );

    const outputMapEntries = Object.entries(OUTPUT_MAP);
    const outputString = decodedOutput
      .map((decode) => {
        const number = outputMapEntries.find(([_, outSet]) =>
          isSameSet(new Set(decode), outSet)
        );

        return number![0];
      })
      .join("");

    const output = parseInt(outputString, 10);

    result += output;
  });

  return result;
};

const decodeWireMap = (
  signalList: string[],
  signalMap: Map<number, number>,
  wireMap: WireMap
) => {
  signalList
    .filter((signal) => signalMap.has(signal.length))
    .forEach((signal) => {
      const number = signalMap.get(signal.length)!;
      const charList = signal.split("");
      const outputList = OUTPUT_MAP[number];

      charList.forEach((char) => {
        wireMap[char] = new Set(
          Array.from(outputList).filter((output) => wireMap[char].has(output))
        );
      });
    });

  const potentialWireMapList = getAllPotentialWireMaps(
    excludeImpossibleWireMaps(wireMap)
  );

  const validWireMap = potentialWireMapList.find((candidate) =>
    isValidWireMap(signalList, candidate)
  );

  return validWireMap;
};

const excludeImpossibleWireMaps = (wireMap: WireMap) => {
  let seenDoubleSetValues = new Set<number>();

  while (Object.values(wireMap).some((set) => set.size > 2)) {
    for (const set of Object.values(wireMap)) {
      if (set.size === 1) {
        seenDoubleSetValues = new Set([...seenDoubleSetValues, ...set]);
      }

      if (set.size === 2) {
        seenDoubleSetValues = new Set([...seenDoubleSetValues, ...set]);
      }
    }

    for (let [char, set] of Object.entries(wireMap)) {
      if (set.size === 1 || set.size === 2) {
        continue;
      }

      set = new Set(
        Array.from(set).filter(
          (setNumber) => !seenDoubleSetValues.has(setNumber)
        )
      );

      wireMap[char] = set;
    }
  }

  return wireMap;
};

const getAllPotentialWireMaps = (wireMap: WireMap): WireMap[] => {
  if (Object.values(wireMap).every((set) => set.size === 1)) {
    return [wireMap];
  }

  const [firstChar, firstSet] = Object.entries(wireMap).find(
    ([_, set]) => set.size === 2
  )!;

  if (!firstSet || !firstChar) {
    return [wireMap];
  }

  const [opposingChar, _] = Object.entries(wireMap).find(
    ([char, set]) => firstChar !== char && isSameSet(set, firstSet)
  )!;

  if (!opposingChar) {
    return [wireMap];
  }

  const [first, second] = Array.from(firstSet);

  return [
    ...getAllPotentialWireMaps({
      ...wireMap,
      [firstChar]: new Set([first]),
      [opposingChar]: new Set([second]),
    }),
    ...getAllPotentialWireMaps({
      ...wireMap,
      [firstChar]: new Set([second]),
      [opposingChar]: new Set([first]),
    }),
  ];
};

const isSameSet = <T>(a: Set<T>, b: Set<T>): boolean =>
  a.size === b.size && Array.from(a).every((i) => b.has(i));

const isValidWireMap = (signalList: string[], wireMap: WireMap) => {
  const wiredSets = signalList
    .map((signal) =>
      signal.split("").map((char) => wireMap[char].values().next().value)
    )
    .map((list) => new Set(list));

  const outputMapEntries = Object.entries(OUTPUT_MAP);
  const mappedNumbers = wiredSets.map((set) => {
    const output = outputMapEntries.find(([_, outSet]) =>
      isSameSet(set, outSet)
    );

    return output && output[0];
  });

  return mappedNumbers.every(Boolean);
};
