import { readInput } from '../util/input';

const input = readInput('day13/packets.txt').trim();

type List = (number | List)[];

const pairs: [List, List][] = input
  .split('\n\n')
  .map(
    (pair) =>
      pair.split('\n').map((packets) => JSON.parse(packets)) as [List, List]
  );

const compareLists = (listA: List, listB: List): number => {
  for (let [i, itemA] of listA.entries()) {
    let itemB = listB[i];

    if (!itemB) {
      return 1;
    }

    let comparison;

    if (typeof itemA === 'number' && typeof itemB === 'number') {
      comparison = itemA - itemB;
    } else {
      comparison = compareLists(
        typeof itemA === 'number' ? [itemA] : itemA,
        typeof itemB === 'number' ? [itemB] : itemB
      );
    }

    if (comparison !== 0) {
      return comparison;
    }
  }

  return listA.length - listB.length;
};

console.log(
  JSON.stringify(
    pairs.map(([listA, listB], i) => {
      return {
        index: i + 1,
        comparison: compareLists(listA, listB),
      };
    }),
    null,
    2
  )
  // .filter(({ comparison }) => comparison <= 0)
  // .reduce((sum, { index }) => sum + index, 0)
);
