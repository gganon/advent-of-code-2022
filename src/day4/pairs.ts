import { readInput } from '../util/input';

const input = readInput('day4/pairs.txt').trim();

const completeOverlaps = input
  .split('\n')
  .map((line) => line.split(/,|-/).map((number) => parseInt(number)))
  .filter(
    ([a1, a2, b1, b2]) => (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2)
  ).length;

console.log(completeOverlaps);

const overlaps = input
  .split('\n')
  .map((line) => line.split(/,|-/).map((number) => parseInt(number)))
  .filter(
    ([a1, a2, b1, b2]) =>
      (a1 >= b1 && a1 <= b2) ||
      (a2 >= b1 && a2 <= b2) ||
      (b1 >= a1 && b1 <= a2) ||
      (b2 >= a1 && b2 <= a2)
  ).length;

console.log(overlaps);
