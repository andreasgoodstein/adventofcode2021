type Command = "forward" | "down" | "up";

export const day2part2 = (input: string[]) => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  input.forEach((line) => {
    const [command, valueString] = line.split(" ") as [Command, string];
    const value = parseInt(valueString, 10);

    switch (command) {
      case "forward": {
        horizontal += value;
        depth += aim * value;
        break;
      }

      case "down": {
        aim += value;
        break;
      }

      case "up": {
        aim -= value;
        break;
      }

      default:
        throw new Error("Unknown command: " + command);
    }
  });

  return horizontal * depth;
};
