export const insertInSortedArray = <T = any>(
  sortedArray: T[],
  newItem: T,
  comparitor: (a: T, b: T) => number
) => {
  for (const [index, item] of sortedArray.entries()) {
    const comparison = comparitor(item, newItem);

    if (comparison > 0) {
      return [
        ...sortedArray.slice(0, index),
        newItem,
        item,
        ...sortedArray.slice(index + 1),
      ];
    }
  }

  return [...sortedArray, newItem];
};
