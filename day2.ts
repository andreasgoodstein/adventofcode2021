import { day2part1 } from "./day2/part1.ts";
import { day2part2 } from "./day2/part2.ts";

import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 2 part 1");
logExecutionTime(readFileLineText("./day2/puzzle.txt"), day2part1);

console.log("\nday 2 part 2");
logExecutionTime(readFileLineText("./day2/puzzle.txt"), day2part2);
