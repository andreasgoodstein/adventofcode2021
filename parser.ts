export const readFileLineText = (fileName: string): string[] => {
  const fileContent = Deno.readTextFileSync(fileName);
  return fileContent.split("\n");
};

export const readFileLineNumbers = (fileName: string): number[] =>
  readFileLineText(fileName).map(parseInteger);

export const splitOnWhitespace = (input: string): string[] => input.split(" ");

export const filterWhitespace = (input: string[]): string[] =>
  input.filter((char) => char && char !== "");

export const parseInteger = (input: string): number => parseInt(input, 10);
