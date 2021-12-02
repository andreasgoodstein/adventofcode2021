type Command = "forward" | "down" | "up";

export const day2part1 = (input: string[]) => {
  let horizontal = 0;
  let depth = 0;

  input.forEach((line) => {
    const [command, valueString] = line.split(" ") as [Command, string];
    const value = parseInt(valueString, 10);

    switch (command) {
      case "forward": {
        horizontal += value;
        break;
      }

      case "down": {
        depth += value;
        break;
      }

      case "up": {
        depth -= value;
        break;
      }

      default:
        throw new Error("Unknown command: " + command);
    }
  });

  return horizontal * depth;
};
