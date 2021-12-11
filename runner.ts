import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1, part2 } from "./day11/part1and2.ts";
// import { part2 } from "./day11/part2.ts";

console.log("\nday 11 part 1");
logExecutionTime(readFileLineText("./day11/puzzle.txt"), part1);

console.log("\nday 11 part 2");
logExecutionTime(readFileLineText("./day11/puzzle.txt"), part2);
