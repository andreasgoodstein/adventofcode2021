export const parse = (input: string[]) => {
  const initialState = input.splice(0, 1)[0];
  const keyMap = input
    .slice(1)
    .map((line) => line.split(" -> "))
    .reduce(
      (map, pair) => map.set(pair[0], pair[1]),
      new Map<string, string>()
    );

  return { initialState, keyMap };
};

export const part1 = (input: string[]) => {
  const { initialState, keyMap } = parse(input);

  const pairMap = getInitialPairMap(initialState, keyMap);

  for (let i = 1; i < 10; i++) {
    getNewPairMap(pairMap, keyMap);
  }

  const countMap = getCountMap(pairMap);

  return getScoreFromCountMap(countMap);
};

export const part2 = (input: string[]) => {
  const { initialState, keyMap } = parse(input);

  const pairMap = getInitialPairMap(initialState, keyMap);

  for (let i = 1; i < 40; i++) {
    getNewPairMap(pairMap, keyMap);
  }

  const countMap = getCountMap(pairMap);

  return getScoreFromCountMap(countMap);
};

const getInitialPairMap = (state: string, keyMap: Map<string, string>) => {
  const newPairMap: Record<string, number> = {};

  for (let i = 0; i < state.length - 1; i++) {
    const key = state[i] + state[i + 1];

    const value = keyMap.get(key)!;

    const newPairs = getNewPairs(key, value);

    newPairs.forEach((pair) => {
      if (newPairMap[pair]) {
        newPairMap[pair] += 1;
      } else {
        newPairMap[pair] = 1;
      }
    });
  }

  return newPairMap;
};

const getNewPairMap = (
  pairMap: Record<string, number>,
  keyMap: Map<string, string>
) => {
  Object.entries(pairMap).forEach(([pair, count]) => {
    const value = keyMap.get(pair)!;
    const newPairs = getNewPairs(pair, value);

    newPairs.forEach((newPair) => {
      if (pairMap[newPair]) {
        pairMap[newPair] += count;
      } else {
        pairMap[newPair] = count;
      }
    });

    pairMap[pair] -= count;
  });
};

const getNewPairs = (pair: string, product: string) =>
  pair
    .split("")
    .map((char, index) =>
      index < 1 ? `${char}${product}` : `${product}${char}`
    );

const getCountMap = (pairMap: Record<string, number>) => {
  const countMap: Record<string, number> = {};

  Object.entries(pairMap).forEach(([pair, count]) => {
    const chars = pair.split("");

    chars.forEach((char) => {
      if (countMap[char]) {
        countMap[char] += count;
      } else {
        countMap[char] = count;
      }
    });
  });

  Object.entries(countMap).forEach(([key, value]) => {
    countMap[key] = Math.ceil(value / 2);
  });

  return countMap;
};

const getScoreFromCountMap = (countMap: Record<string, number>): number => {
  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;

  Object.values(countMap).forEach((count) => {
    max = Math.max(max, count);
    min = Math.min(min, count);
  });

  return max - min;
};
