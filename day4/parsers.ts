export const parseNumberList = (numberString: string) =>
  numberString
    .split(",")
    .filter(Boolean)
    .map((number) => parseInt(number, 10));

export const parseBoardList = (input: string[]) => {
  const boardList = new Array<Array<Set<number>>>();

  let board = new Array<Set<number>>();

  let columnList = new Map<number, Set<number>>();
  input.forEach((line) => {
    if (line.length < 1) {
      boardList.push(board);
      board = new Array<Set<number>>();
      columnList = new Map<number, Set<number>>();
      return;
    }

    const row = new Set<number>();

    const charList = line.split(" ").filter(Boolean);

    charList.forEach((char, index) => {
      const number = parseInt(char, 10);

      const col = columnList.has(index)
        ? columnList.get(index)!
        : new Set<number>();

      row.add(number);
      col.add(number);

      columnList.set(index, col);
    });

    Array.from(columnList.values()).forEach((col) => {
      board.push(col);
    });
    board.push(row);
  });

  boardList.push(board);
  return boardList;
};
