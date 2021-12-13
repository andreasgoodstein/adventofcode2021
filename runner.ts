import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1 } from "./day13/part1.ts";
import { part2 } from "./day13/part2.ts";

console.log("\nday 13 part 1");
logExecutionTime(readFileLineText("./day13/puzzle.txt"), part1);

console.log("\nday 13 part 2");
logExecutionTime(readFileLineText("./day13/puzzle.txt"), part2);
