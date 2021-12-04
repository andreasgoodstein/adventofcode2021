import { parseBoardList, parseNumberList } from "./parsers.ts";

export const day4part2 = (input: string[]) => {
  const [numberString, _, ...boardStringList] = input;

  const numberList = parseNumberList(numberString);

  const boardList = parseBoardList(boardStringList);

  return playBingo(numberList, boardList);
};

const playBingo = (
  numberList: number[],
  boardList: Array<Array<Set<number>>>
) => {
  let latestResult = 0;

  numberList.forEach((number) => {
    boardList.forEach((board) => {
      let bingo = false;

      board.forEach((set) => {
        if (set.has(number)) {
          set.delete(number);

          if (set.size < 1) {
            bingo = true;
          }
        }
      });

      if (bingo) {
        const boardSet = board.reduce((superSet, set) => {
          Array.from(set).forEach((number) => {
            superSet.add(number);
          });
          return superSet;
        }, new Set<number>());

        const remainingSum = Array.from(boardSet).reduce(
          (setSum, number) => setSum + number,
          0
        );

        latestResult = remainingSum * number;

        board.forEach((set) => set.clear());
      }
    });
  });

  return latestResult;
};
