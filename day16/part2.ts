import { parseRest, stack, Unit } from "./part1.ts";

const parseToBinary = (char: string) =>
  (parseInt(char, 16) >>> 0).toString(2).padStart(4, "0");

export const part2 = (input: string[]) => {
  const line = Array.from(input[0]).map(parseToBinary).join("");

  parseRest(line, 0);

  return decode(stack.pop()!);
};

const decode = (unit: Unit): number => {
  const { level, value, type } = unit;

  switch (type) {
    case "100": {
      return parseInt(value, 2);
    }

    case "000": {
      // Sum
      return getNextValues(level).reduce((sum, value) => sum + value, 0);
    }

    case "001": {
      // Product
      return getNextValues(level).reduce((sum, value) => sum * value, 1);
    }

    case "010": {
      // Minmum
      return getNextValues(level).reduce(
        (sum, value) => Math.min(value, sum),
        Number.MAX_SAFE_INTEGER
      );
    }

    case "011": {
      // Maximum
      return getNextValues(level).reduce(
        (sum, value) => Math.max(value, sum),
        Number.MIN_SAFE_INTEGER
      );
    }

    case "101": {
      // greater than
      const [second, first] = getNextValues(level);

      return first > second ? 1 : 0;
    }

    case "110": {
      // lesser than
      const [second, first] = getNextValues(level);

      return first < second ? 1 : 0;
    }

    case "111": {
      // equal to
      const [second, first] = getNextValues(level);

      return first === second ? 1 : 0;
    }

    default: {
      console.log("unknown type", type);
      break;
    }
  }

  return 0;
};

const getNextValues = (level: number) => {
  const result: number[] = [];

  if (stack.length < 1) {
    return result;
  }

  let next = stack.pop()!;
  while (next?.level > level) {
    if (next.type === "100") {
      result.push(parseInt(next.value, 2));
    } else {
      result.push(decode(next));
    }
    next = stack.pop()!;
  }

  if (next) {
    stack.push(next);
  }

  return result;
};
