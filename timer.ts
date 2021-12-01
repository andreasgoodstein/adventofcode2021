export const logExecutionTime = <T, U>(
  input: U,
  puzzleFunction: (_: U) => T
) => {
  const start = performance.now();

  const result = puzzleFunction(input);

  console.log(`execution time: ${performance.now() - start}ms`);

  console.log(result);
};
