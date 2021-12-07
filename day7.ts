import { day7part1 } from "./day7/part1.ts";
import { day7part2 } from "./day7/part2.ts";

import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 7 part 1");
logExecutionTime(readFileLineText("./day7/puzzle.txt"), day7part1);

console.log("\nday 7 part 2");
logExecutionTime(readFileLineText("./day7/puzzle.txt"), day7part2);
