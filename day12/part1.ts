export type Graph = Map<string, string[]>;

export const part1 = (input: string[]) => {
  const graph = getGraph(input);

  console.log(graph);

  return getPaths(graph, new Set(), "start", "end");
};

export const getGraph = (input: string[]) => {
  const edges = input.map((line) => line.split("-"));

  const graph: Graph = new Map();

  edges.forEach(([start, end]) => {
    graphSetEdge(graph, start, end);
    graphSetEdge(graph, end, start);
  });

  return graph;
};

const graphSetEdge = (graph: Graph, start: string, end: string) => {
  if (start === "end") {
    return;
  }

  graph.set(start, [...(graph.get(start) || []), end]);
};

const getPaths = (
  graph: Graph,
  alreadySeen: Set<string>,
  node: string,
  end: string
): number => {
  if (node === end) {
    return 1;
  }

  if (!graph.has(node)) {
    return 0;
  }

  if (node === node.toLowerCase()) {
    alreadySeen.add(node);
  }

  const nextNodes = graph.get(node)!;

  return nextNodes
    .filter((next) => !alreadySeen.has(next))
    .reduce(
      (sum, next) => sum + getPaths(graph, new Set(alreadySeen), next, end),
      0
    );
};
