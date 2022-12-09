import { readInput } from '../util/input';
const input = readInput('day9/rope.txt').trim();

const move = {
  R: ([x, y]) => [x + 1, y],
  L: ([x, y]) => [x - 1, y],
  U: ([x, y]) => [x, y + 1],
  D: ([x, y]) => [x, y - 1],
};

const isTouching = ([ax, ay]: number[], [bx, by]: number[]) => {
  return Math.abs(ax - bx) < 2 && Math.abs(ay - by) < 2;
};

const catchUp = ([ax, ay]: number[], [bx, by]: number[]) => {
  return [
    ax == bx ? bx : ax > bx ? bx + 1 : bx - 1,
    ay == by ? by : ay > by ? by + 1 : by - 1,
  ];
};

const run = (head: number[], knots: number[][]) => {
  const visitedTailPositions = new Set().add('0,0');

  input
    .split('\n')
    .map((line) => {
      const [direction, moves] = line.split(' ');
      return [direction, parseInt(moves)];
    })
    .forEach(([direction, moves]) => {
      for (let i = 0; i < moves; i++) {
        head = move[direction](head);

        for (let i = 0; i < knots.length; i++) {
          const followingKnot = knots[i - 1] || head;

          if (!isTouching(followingKnot, knots[i])) {
            knots[i] = catchUp(followingKnot, knots[i]);
          }
        }

        visitedTailPositions.add(knots[knots.length - 1].join(','));
      }
    });

  console.log(visitedTailPositions.size);
};

// part 1
run([0, 0], [[0, 0]]);

// part 2
run(
  [0, 0],
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
);
