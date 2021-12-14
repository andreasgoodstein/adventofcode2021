import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1 } from "./day14/part1and2.ts";
import { part2 } from "./day14/part1and2.ts";

console.log("\nday 14 part 1");
logExecutionTime(readFileLineText("./day14/puzzle.txt"), part1);

console.log("\nday 14 part 2");
logExecutionTime(readFileLineText("./day14/puzzle.txt"), part2);
