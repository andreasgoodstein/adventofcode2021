import { day4part1 } from "./day4/part1.ts";
import { day4part2 } from "./day4/part2.ts";

import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 4 part 1");
logExecutionTime(readFileLineText("./day4/puzzle.txt"), day4part1);

console.log("\nday 4 part 2");
logExecutionTime(readFileLineText("./day4/puzzle.txt"), day4part2);
