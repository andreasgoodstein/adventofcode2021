import { getCorruptChunkChar } from "./part1.ts";

type openTag = "(" | "[" | "{" | "<";
type closeTag = ")" | "]" | "}" | ">";

const pointMap = { ")": 1, "]": 2, "}": 3, ">": 4 };

const tagMap = new Map<openTag, closeTag>([
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
]);

export const part2 = (input: string[]) => {
  const incompleteLineList = input.filter((line) => !getCorruptChunkChar(line));

  const closingCharacterLists = incompleteLineList.map(
    getMissingClosingCharacters
  );

  const scoreList = closingCharacterLists.map(scoreClosingCharacterString);

  return scoreList
    .sort((a, b) => a - b)
    .slice(scoreList.length / 2, scoreList.length / 2 + 1)
    .pop();
};

const getMissingClosingCharacters = (input: string): closeTag[] => {
  const charStack: openTag[] = [];

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

      case ")":
      case "]":
      case "}":
      case ">": {
        charStack.pop();
        break;
      }

      default: {
        console.log("Invalid", char);
      }
    }
  }

  const result: closeTag[] = [];
  while (charStack.length > 0) {
    const openChar = charStack.pop();
    result.push(tagMap.get(openChar!)!);
  }
  return result;
};

const scoreClosingCharacterString = (input: closeTag[]): number =>
  input.reduce((sum, char) => sum * 5 + pointMap[char], 0);
