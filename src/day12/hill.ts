import { readInput } from '../util/input';

const input = readInput('day12/heightmap.txt').trim();

const map = input.split('\n');
const startX = map.findIndex((row) => row.includes('S'));
const startY = Array.from(map[startX]).findIndex((c) => c === 'S');

const isClimbable = (
  a: { x: number; y: number },
  b: { x: number; y: number }
) => {
  let source = map[a.x]?.[a.y];
  let dest = map[b.x]?.[b.y];

  if (source === 'S') {
    source = 'a';
  }

  if (dest === 'E') {
    dest = 'z';
  }

  return dest?.charCodeAt(0) - source?.charCodeAt(0) <= 1;
};

const getPossibleSteps = (
  position: { x: number; y: number },
  visited: Set<string>
) => {
  const right = { x: position.x, y: position.y + 1 };
  const left = { x: position.x, y: position.y - 1 };
  const up = { x: position.x - 1, y: position.y };
  const down = { x: position.x + 1, y: position.y };

  return [up, down, left, right].filter((next) => {
    // console.log(
    //   next,
    //   map[next.x]?.[next.y],
    //   !visited.has(`${next.x},${next.y}`),
    //   isClimbable(position, next)
    // );
    return (
      map[next.x]?.[next.y] &&
      !visited.has(`${next.x},${next.y}`) &&
      isClimbable(position, next)
    );
  });
};

// const leastSteps = (
//   position: { x: number; y: number },
//   steps = 0,
//   visited: Set<string> = new Set<string>()
// ): number => {
//   visited.add(`${position.x},${position.y}`);

//   const nextSteps = getPossibleSteps(position, visited);

//   if (!nextSteps.length) {
//     return Infinity;
//   }

//   if (nextSteps.find((next) => map[next.x][next.y] === 'E')) {
//     return steps + 1;
//   }

//   nextSteps.forEach((next) => visited.add(`${next.x},${next.y}`));

//   const possibleSteps = nextSteps.map((next) =>
//     leastSteps(next, steps + 1, new Set(visited))
//   );

//   return possibleSteps.sort()[0];
// };

const leastSteps = (
  position: { x: number; y: number },
  visited: Set<string> = new Set<string>()
): number => {
  visited.add(`${position.x},${position.y}`);

  let nextSteps = getPossibleSteps(position, visited);
  let steps = 1;

  while (true) {
    nextSteps.forEach((next) => visited.add(`${next.x},${next.y}`));
    nextSteps = nextSteps.flatMap((next) => getPossibleSteps(next, visited));
    steps++;

    if (nextSteps.find(({ x, y }) => map[x][y] === 'E')) {
      return steps;
    }
  }
};

console.log(leastSteps({ x: startX, y: startY }));
