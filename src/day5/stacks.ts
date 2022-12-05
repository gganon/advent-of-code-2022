import { readInput } from '../util/input';

const input = readInput('day5/stacks.txt');

let [stacksInput, movesInput] = input.split('\n\n');

const originalStacks: Record<string, string[]> = stacksInput
  .split('\n')
  .slice(0, -1)
  .map((line) =>
    line
      .match(/(\[\w\]|   ) ?/g)
      .map((space) => space.replace(/[\[\]\s]+/g, ''))
  )
  .reduce((stacks, row) => {
    row.forEach((letter, index) => {
      if (letter) {
        stacks[index] = [...(stacks[index] || []), letter];
      }
    });
    return stacks;
  }, {});

// make a deep copy
let stacks = JSON.parse(JSON.stringify(originalStacks));

movesInput
  .trim()
  .split('\n')
  .map((moveLine) =>
    moveLine
      .match(/move (\d+) from (\d+) to (\d+)/)
      .slice(1, 4)
      .map((n) => parseInt(n))
  )
  .forEach(([num, from, to]) => {
    const removed = stacks[from - 1].splice(0, Number(num)).reverse();
    stacks[to - 1] = [...removed, ...stacks[to - 1]];
  });

console.log(Object.values(stacks).reduce((str, stack) => str + stack[0], ''));

// make a deep copy
stacks = JSON.parse(JSON.stringify(originalStacks));

movesInput
  .trim()
  .split('\n')
  .map((moveLine) =>
    moveLine
      .match(/move (\d+) from (\d+) to (\d+)/)
      .slice(1, 4)
      .map((n) => parseInt(n))
  )
  .forEach(([num, from, to]) => {
    const removed = stacks[from - 1].splice(0, Number(num));
    stacks[to - 1] = [...removed, ...stacks[to - 1]];
  });

console.log(Object.values(stacks).reduce((str, stack) => str + stack[0], ''));
