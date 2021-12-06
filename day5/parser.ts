export type Coord = {
  x: number;
  y: number;
};

export type Line = {
  start: Coord;
  end: Coord;
};

export const parseLines = (input: string[]): Line[] =>
  input
    .map((inputLine) => inputLine.split(" -> "))
    .map(([start, end]) => {
      const [x1, y1] = start.split(",");
      const [x2, y2] = end.split(",");

      return {
        start: { x: parse(x1), y: parse(y1) },
        end: { x: parse(x2), y: parse(y2) },
      };
    });

const parse = (number: string): number => parseInt(number, 10);
