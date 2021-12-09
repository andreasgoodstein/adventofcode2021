import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1 } from "./day9/part1.ts";
import { part2 } from "./day9/part2.ts";

console.log("\nday 9 part 1");
logExecutionTime(readFileLineText("./day9/puzzle.txt"), part1);

console.log("\nday 9 part 2");
logExecutionTime(readFileLineText("./day9/puzzle.txt"), part2);
