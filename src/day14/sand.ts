import { readInput } from '../util/input';

const input = readInput('day14/rocks.txt').trim();

let maxX = 0;
let maxY = 0;

const paths = input.split('\n').map((path) =>
  path.split(' -> ').map((coord) => {
    const [y, x] = coord
      .split(',')
      .slice(0, 2)
      .map((v) => parseInt(v));
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    return { x, y };
  })
);

const cave: string[][] = new Array(maxX + 3)
  .fill(null)
  .map(() => new Array(maxY + 500).fill(' '));

paths.map((path) =>
  path.forEach((current, i, path) => {
    if (i === 0) {
      return;
    }

    const previous = path[i - 1];

    if (current.x === previous.x) {
      const from = Math.min(previous.y, current.y);
      const to = Math.max(previous.y, current.y);
      for (let j = from; j <= to; j++) {
        cave[current.x][j] = '#';
      }
    } else {
      const from = Math.min(previous.x, current.x);
      const to = Math.max(previous.x, current.x);
      for (let i = from; i <= to; i++) {
        cave[i][current.y] = '#';
      }
    }
  })
);

const dropSand = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): { x: number; y: number } | null => {
  for (let i = x + 1; i < cave.length; i++) {
    if (['o', '#'].includes(cave[i][y])) {
      if (cave[i][y - 1] === ' ') {
        return dropSand({ x: i, y: y - 1 });
      }
      if (cave[i][y + 1] === ' ') {
        return dropSand({ x: i, y: y + 1 });
      }
      return { x: i - 1, y };
    }
  }

  return null;
};

// part 1
let settledSand = 0;
while (true) {
  // writeFileSync('cave.txt', cave.map((row) => row.join('')).join('\n'));
  // await new Promise((resolve) => setTimeout(resolve, 50));
  const settledPosition = dropSand({ x: 0, y: 500 });

  if (!settledPosition) {
    console.log(settledSand);
    break;
  }

  settledSand++;
  cave[settledPosition.x][settledPosition.y] = 'o';
}

// part 2

for (let j = 0; j < cave[0].length; j++) {
  cave[cave.length - 1][j] = '#';
}

while (true) {
  // writeFileSync('cave.txt', cave.map((row) => row.join('')).join('\n'));
  // await new Promise((resolve) => setTimeout(resolve, 50));
  const settledPosition = dropSand({ x: 0, y: 500 });

  settledSand++;
  cave[settledPosition.x][settledPosition.y] = 'o';

  if (settledPosition.x === 0 && settledPosition.y === 500) {
    console.log(settledSand);
    break;
  }
}
