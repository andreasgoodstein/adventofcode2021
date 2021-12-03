import { day3part1 } from "./day3/part1.ts";
import { day3part2 } from "./day3/part2.ts";

import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 3 part 1");
logExecutionTime(readFileLineText("./day3/puzzle.txt"), day3part1);

console.log("\nday 3 part 2");
logExecutionTime(readFileLineText("./day3/puzzle.txt"), day3part2);
