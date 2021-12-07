const STATE_COUNT = 9;
const PART1_DAYS = 80;
const PART2_DAYS = 256;

export const day6part1 = (input: string[]) => {
  const initialState = input[0]
    .split(",")
    .map((number: string) => parseInt(number, 10));

  let fishList = parseInput(initialState);

  fishList = runFishSimulation(fishList, PART1_DAYS);

  return fishList.reduce((sum, state) => sum + state, 0);
};

export const day6part2 = (input: string[]) => {
  const initialState = input[0]
    .split(",")
    .map((number: string) => parseInt(number, 10));

  let fishList = parseInput(initialState);

  fishList = runFishSimulation(fishList, PART2_DAYS);

  return fishList.reduce((sum, state) => sum + state, 0);
};

const runFishSimulation = (fishList: number[], DAY_COUNT: number): number[] => {
  for (let i = 0; i < DAY_COUNT; i++) {
    fishList = [
      fishList[1], // 0
      fishList[2], // 1
      fishList[3], // 2
      fishList[4], // 3
      fishList[5], // 4
      fishList[6], // 5
      fishList[7] + fishList[0], // 6
      fishList[8], // 7
      fishList[0], // 8
    ];
  }

  return fishList;
};

const parseInput = (initialState: number[]): number[] => {
  const result = new Array<number>(STATE_COUNT).fill(0);

  initialState.forEach((fish) => (result[fish] += 1));

  return result;
};
