import graph from "https://cdn.skypack.dev/graphlib";

export const part1 = (input: string[]) => {
  const array = getArray(input);

  const edgeList = getEdgeList(array);

  const edgeWeight: Record<string, number> = getEdgeWeightMap(
    Object.keys(edgeList),
    array
  );

  const endCoordinate = getId(input.length - 1, input[0].length - 1);

  return (
    graph.alg.dijkstra(getGraph(edgeList), "0,0", ({ w }: { w: string }) => {
      return edgeWeight[w];
    }) as Record<string, { distance: number }>
  )[endCoordinate].distance;
};

const getArray = (input: string[]) =>
  input.map((line) => line.split("").map((char) => parseInt(char, 10)));

const getEdgeList = (input: number[][]) => {
  const edgeMap: Record<string, Record<string, number>> = {};

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const neighbors = getNeighbors(x, y, input);

      edgeMap[getId(x, y)] = neighbors.reduce((map, [nX, nY]) => {
        map[getId(nX, nY)] = input[nX][nY];
        return map;
      }, {} as Record<string, number>);
    }
  }

  return edgeMap;
};

const getNeighbors = (x: number, y: number, array: number[][]) =>
  [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter(
    ([x, y]) => x > -1 && y > -1 && y < array.length && x < array[y].length
  );

const getId = (x: number, y: number) => `${x},${y}`;

const getGraph = (edgeList: Record<string, Record<string, number>>) => {
  const g = new graph.Graph({ multigraph: true });

  Object.entries(edgeList).forEach(([edge, edges]) => {
    Object.entries(edges).forEach(([toEdge]) => {
      g.setEdge(edge, toEdge);
    });
  });

  return g;
};

const getEdgeWeightMap = (list: string[], array: number[][]) => {
  return list.reduce((map, edge) => {
    const [x, y] = edge.split(",").map((char) => parseInt(char, 10));

    map[edge] = array[x][y];
    return map;
  }, {} as Record<string, number>);
};
