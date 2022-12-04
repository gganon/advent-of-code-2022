import { readInput } from '../util/input';

const input = readInput('day3/rucksacks.txt').trim();

const getPriorityOf = (letter: string) =>
  letter > 'Z' ? letter.charCodeAt(0) - 96 : letter.charCodeAt(0) - 64 + 26;

const findCommonLetters = (
  letterMap: Record<string, true>,
  str: string
): Record<string, true> => {
  return Array.from(str).reduce((common, char) => {
    if (letterMap[char]) {
      return { ...common, [char]: true };
    }

    return common;
  }, {});
};

const toLetterMap = (str: string): Record<string, true> =>
  Array.from(str).reduce((map, letter) => ({ ...map, [letter]: true }), {});

const compartmentPrioritySum = input
  .split('\n')
  .map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)])
  .map(([compartment1, compartment2]) => {
    return Object.keys(
      findCommonLetters(toLetterMap(compartment1), compartment2)
    )[0];
  })
  .reduce((sum, letter) => {
    return sum + getPriorityOf(letter);
  }, 0);

console.log(compartmentPrioritySum);

const badgePrioritySum = input
  .match(/(?:^.*$\n?){1,3}/gm)
  .map((group) => group.split('\n').slice(0, 3))
  .map(
    ([rucksack1, rucksack2, rucksack3]) =>
      Object.keys(
        findCommonLetters(
          findCommonLetters(toLetterMap(rucksack1), rucksack2),
          rucksack3
        )
      )[0]
  )
  .reduce((sum, letter) => {
    return sum + getPriorityOf(letter);
  }, 0);

console.log(badgePrioritySum);
