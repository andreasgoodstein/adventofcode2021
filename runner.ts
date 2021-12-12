import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

import { part1 } from "./day12/part1.ts";
import { part2 } from "./day12/part2.ts";

console.log("\nday 12 part 1");
logExecutionTime(readFileLineText("./day12/example.txt"), part1);

console.log("\nday 12 part 2");
logExecutionTime(readFileLineText("./day12/puzzle.txt"), part2);
