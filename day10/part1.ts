const pointMap = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

export const part1 = (input: string[]) => {
  return input
    .map(getCorruptChunkChar)
    .filter(Boolean)
    .reduce((sum, char) => sum + pointMap[char!], 0);
};

export const getCorruptChunkChar = (input: string) => {
  const charStack = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    switch (char) {
      case "(":
      case "[":
      case "{":
      case "<": {
        charStack.push(char);
        break;
      }

      case ")": {
        if (charStack.pop() !== "(") {
          return char;
        }
        break;
      }

      case "]": {
        if (charStack.pop() !== "[") {
          return char;
        }
        break;
      }

      case "}": {
        if (charStack.pop() !== "{") {
          return char;
        }
        break;
      }

      case ">": {
        if (charStack.pop() !== "<") {
          return char;
        }
        break;
      }

      default: {
        console.log("Invalid", char);
      }
    }
  }
};
