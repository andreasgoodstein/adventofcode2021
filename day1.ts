import { day1part1 } from "./day1/part1.ts";
import { day1part2 } from "./day1/part2.ts";

import { readFileLineNumbers } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 1 part 1");
logExecutionTime(readFileLineNumbers("day1/puzzle.txt"), day1part1);

console.log("\nday 1 part 2");
logExecutionTime(readFileLineNumbers("day1/puzzle.txt"), day1part2);
