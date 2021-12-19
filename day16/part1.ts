const parseToBinary = (char: string) =>
  (parseInt(char, 16) >>> 0).toString(2).padStart(4, "0");
export type Unit = {
  level: number;
  version: string;
  type: string;
  value: string;
  rest: string;
};

export const stack: Unit[] = [];

export const part1 = (input: string[]) => {
  const line = Array.from(input[0]).map(parseToBinary).join("");

  parseRest(line, 0);

  return stack.reduce((sum, { version }) => sum + parseInt(version, 2), 0);
};

export const parseRest = (restInput: string, level: number) => {
  if (restInput.length < 11) {
    return { rest: restInput };
  }

  const version = restInput.slice(0, 3);
  const type = restInput.slice(3, 6);

  let value = "";
  let rest = restInput.slice(6);

  switch (type) {
    case "100": {
      const parsed = parseLiteral(rest);
      value = parsed.value;
      rest = parsed.rest;
      break;
    }

    default: {
      const parsed = parseOperation(rest, level + 1);
      value = parsed.value;
      rest = parsed.rest;
      break;
    }
  }

  stack.push({ level, version, type, value, rest });

  return { rest, value };
};

const parseLiteral = (input: string) => {
  let subInput = input;
  let value = "";

  while (subInput[0] === "1") {
    value += subInput.slice(1, 5);
    subInput = subInput.slice(5);
  }

  value += subInput.slice(1, 5);

  return { value, rest: subInput.slice(5) };
};

const parseOperation = (input: string, level: number) => {
  let subRest = "";

  const is15Bit = input[0] === "0";

  if (is15Bit) {
    const subLength = parseInt(input.slice(1, 16), 2);
    subRest = input.slice(16, 16 + subLength);
    while (subRest) {
      const { rest } = parseRest(subRest, level);
      subRest = rest;
    }
    subRest = input.slice(16 + subLength);
  } else {
    let subCount = parseInt(input.slice(1, 12), 2);
    subRest = input.slice(12);
    while (subRest && subCount > 0) {
      const { rest } = parseRest(subRest, level);
      subRest = rest;
      subCount -= 1;
    }
  }

  return {
    value: `${input[0]}`,
    rest: subRest,
  };
};
