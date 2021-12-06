import { day5part1 } from "./day5/part1.ts";
import { day5part2 } from "./day5/part2.ts";

import { readFileLineText } from "./parser.ts";
import { logExecutionTime } from "./timer.ts";

console.log("\nday 5 part 1");
logExecutionTime(readFileLineText("./day5/puzzle.txt"), day5part1);

console.log("\nday 5 part 2");
logExecutionTime(readFileLineText("./day5/puzzle.txt"), day5part2);
