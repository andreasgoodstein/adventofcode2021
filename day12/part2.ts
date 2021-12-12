import { getGraph, Graph } from "./part1.ts";

export const part2 = (input: string[]) => {
  const graph = getGraph(input);

  return getPaths(graph, new Set(), "", "start");
};

const getPaths = (
  graph: Graph,
  alreadySeen: Set<string>,
  smallCaveVisitedBy: string,
  node: string
): number => {
  if (node === "end") {
    return 1;
  }

  if (!graph.has(node)) {
    return 0;
  }

  if (node === node.toLowerCase()) {
    alreadySeen.add(node);
  }

  const nextNodes = graph.get(node)!;

  let pathCount = 0;

  nextNodes.forEach((next) => {
    if (next === "start") {
      return;
    }

    if (!alreadySeen.has(next)) {
      pathCount += getPaths(
        graph,
        new Set(alreadySeen),
        smallCaveVisitedBy,
        next
      );

      return;
    }

    if (smallCaveVisitedBy) {
      return;
    }

    pathCount += getPaths(graph, new Set(alreadySeen), next, next);
  });

  return pathCount;
};
