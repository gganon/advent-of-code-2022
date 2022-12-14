import { writeFileSync } from 'fs';
import { readInput } from '../util/input';

const input = readInput('day14/rocks.txt').trim();

console.log(input);

const maxSize =
  input
    .match(/\d+/g)
    .map((n) => parseInt(n))
    .sort((a, b) => a - b)
    .slice(-1)[0] + 2;

const cave: string[][] = new Array(maxSize)
  .fill(null)
  .map(() => new Array(maxSize).fill('.'));

input.split('\n').map((path) => {
  return path
    .split(' -> ')
    .map((coord) => {
      const [y, x] = coord.split(',');
      return { x: parseInt(x), y: parseInt(y) };
    })
    .forEach((current, i, path) => {
      if (i === 0) {
        return;
      }

      const previous = path[i - 1];
      console.log('draw line from', previous, current);

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
    });
});

const dropSand = ({
  x,
  y,
}: {
  x: number;
  y: number;
}): { x: number; y: number } | null => {
  for (let i = x + 1; i < maxSize; i++) {
    if (['o', '#'].includes(cave[i][y])) {
      if (cave[i][y - 1] === '.') {
        return dropSand({ x: i, y: y - 1 });
      }
      if (cave[i][y + 1] === '.') {
        return dropSand({ x: i, y: y + 1 });
      }
      return { x: i - 1, y };
    }
  }

  return null;
};

let settledSand = 0;
while (true) {
  const settledPosition = dropSand({ x: 0, y: 500 });

  if (!settledPosition) {
    console.log(settledSand);
    break;
  }

  settledSand++;
  cave[settledPosition.x][settledPosition.y] = 'o';
}

// writeFileSync('cave.txt', cave.map((row) => row.join('')).join('\n'));
