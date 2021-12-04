import { parseBoardList, parseNumberList } from "./parsers.ts";

export const day4part1 = (input: string[]) => {
  const [numberString, _, ...boardStringList] = input;

  const numberList = parseNumberList(numberString);

  const boardList = parseBoardList(boardStringList);

  return playBingo(numberList, boardList);
};

const playBingo = (
  numberList: number[],
  boardList: Array<Array<Set<number>>>
) => {
  let result = 0;

  let bingo = false;
  numberList.forEach((number) => {
    if (bingo) {
      return;
    }

    boardList.forEach((board) => {
      if (bingo) {
        return;
      }

      board.forEach((set) => {
        if (bingo) {
          return;
        }

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

        result = remainingSum * number;
      }
    });
  });

  return result;
};
