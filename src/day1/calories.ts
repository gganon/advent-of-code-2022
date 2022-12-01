import { readInput } from '../util/input';
import { insertInSortedArray } from '../util/sort';

const input = readInput('day1/calories/calories.txt').toString().trim();

type ElfWithCalories = {
  elfNumber: number;
  totalCalories: number;
};

const elfCollections: number[][] = input
  .split('\n\n')
  .map((elfBlock) =>
    elfBlock.split('\n').map((calories) => parseInt(calories))
  );

let elfWithMostCalories: ElfWithCalories = {
  elfNumber: 0,
  totalCalories: -Infinity,
};

let top3Elves: ElfWithCalories[] = Array(3).fill({
  elfNumber: -1,
  totalCalories: -Infinity,
});

for (const [elfNumber, items] of elfCollections.entries()) {
  const totalCalories = items.reduce((total, calories) => total + calories, 0);
  console.log(
    `Elf ${elfNumber + 1} is carrying a total of ${totalCalories} calories`
  );

  if (elfWithMostCalories.totalCalories < totalCalories) {
    elfWithMostCalories = { elfNumber, totalCalories };
  }

  top3Elves = insertInSortedArray<ElfWithCalories>(
    top3Elves,
    { elfNumber, totalCalories },
    (elf1, elf2) => elf2.totalCalories - elf1.totalCalories
  ).slice(0, 3);
}

console.log(
  `\n\nElf ${
    elfWithMostCalories.elfNumber + 1
  } is carrying the most calories: ${elfWithMostCalories.totalCalories}`
);

console.log(`\n\ntop 3 elves:`);
console.log(
  top3Elves
    .map((elf) => `Elf ${elf.elfNumber + 1}: ${elf.totalCalories}`)
    .join('\n')
);

console.log(
  `\nCalories carried by top 3 elves: ${top3Elves.reduce(
    (total, elf) => total + elf.totalCalories,
    0
  )}`
);
