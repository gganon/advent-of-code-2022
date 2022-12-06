import { readInput } from '../util/input';

const input = readInput('day6/data-stream.txt');

const isUnique = (str: string) => {
  return Array.from(str).every(
    (char, i, str) => !str.slice(i + 1).includes(char)
  );
};

for (let i = 3; i < input.length; i++) {
  const slice = input.slice(i - 3, i + 1);
  if (isUnique(slice)) {
    console.log(i + 1);
    break;
  }
}

for (let i = 13; i < input.length; i++) {
  const slice = input.slice(i - 13, i + 1);
  if (isUnique(slice)) {
    console.log(i + 1);
    break;
  }
}
