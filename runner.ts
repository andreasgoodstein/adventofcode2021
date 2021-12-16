import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1 } from "./day15/part1.ts";
import { part2 } from "./day15/part2.ts";

console.log("\nday 15 part 1");
logExecutionTime(readFileLineText("./day15/puzzle.txt"), part1);

console.log("\nday 15 part 2");
logExecutionTime(readFileLineText("./day15/puzzle.txt"), part2);
