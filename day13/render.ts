import { getCoordId } from "../helper.ts";

export const renderCoordinateList = (
  coordinateList: Array<[number, number]>
) => {
  let xMax = 0;
  let yMax = 0;

  const coordinateIdSet = new Set<string>();

  coordinateList.forEach(([x, y]) => {
    xMax = Math.max(xMax, x);
    yMax = Math.max(yMax, y);

    coordinateIdSet.add(getCoordId(x, y));
  });

  console.log("\n");
  for (let i = 0; i <= yMax; i++) {
    let line = "";

    for (let j = 0; j <= xMax; j++) {
      if (coordinateIdSet.has(getCoordId(j, i))) {
        line += "#";
      } else {
        line += " ";
      }
    }

    console.log(line);
  }
  console.log("\n");
};
