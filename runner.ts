import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1 } from "./day16/part1.ts";
import { part2 } from "./day16/part2.ts";

console.log("\nday 16 part 1");
logExecutionTime(readFileLineText("./day16/puzzle.txt"), part1);

console.log("\nday 16 part 2");
logExecutionTime(readFileLineText("./day16/puzzle.txt"), part2);
