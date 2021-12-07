import { day6part1 } from "./day6/part1and2.ts";
import { day6part2 } from "./day6/part1and2.ts";

import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 6 part 1");
logExecutionTime(readFileLineText("./day6/puzzle.txt"), day6part1);

console.log("\nday 6 part 2");
logExecutionTime(readFileLineText("./day6/puzzle.txt"), day6part2);
