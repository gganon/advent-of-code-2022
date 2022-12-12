import { readInput } from '../util/input';

const input = readInput('day12/heightmap.txt').trim();

const map = input.split('\n').map((line) => line.split(''));

const findPositions = (char: string) => {
  let positions = [];
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === char) {
        positions.push({ x, y });
      }
    }
  }

  return positions;
};

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
    return (
      map[next.x]?.[next.y] &&
      !visited.has(`${next.x},${next.y}`) &&
      isClimbable(position, next)
    );
  });
};

const leastSteps = (
  position: { x: number; y: number },
  visited: Set<string> = new Set<string>()
): number => {
  visited.add(`${position.x},${position.y}`);

  let nextSteps = getPossibleSteps(position, visited);
  let steps = 1;

  while (true) {
    steps++;

    nextSteps.forEach((next) => visited.add(`${next.x},${next.y}`));

    nextSteps = nextSteps
      .flatMap((next) => getPossibleSteps(next, visited))
      // filter duplicates
      .filter(
        (next, i, steps) =>
          !steps
            .slice(i + 1)
            .find((step) => step.x === next.x && step.y === next.y)
      );

    if (nextSteps.find(({ x, y }) => map[x][y] === 'E')) {
      return steps;
    }

    if (!nextSteps.length) {
      return Infinity;
    }
  }
};

console.log(leastSteps(findPositions('S')[0]));

console.log(
  findPositions('a')
    .map((pos) => leastSteps(pos))
    .sort((a, b) => a - b)[0]
);
