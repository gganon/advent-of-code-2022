import { readInput } from '../../input';

const input = readInput('day1/calories/calories.txt').toString().trim();

const elfCollections = input
  .split('\n\n')
  .map((elfBlock) =>
    elfBlock.split('\n').map((calories) => parseInt(calories))
  );

let elfWithMostCalories = {
  elfNumber: 0,
  totalCalories: -Infinity,
};

for (const [elfNumber, items] of elfCollections.entries()) {
  const totalCalories = items.reduce((total, calories) => total + calories, 0);
  console.log(
    `Elf ${elfNumber + 1} is carrying a total of ${totalCalories} calories`
  );

  if (elfWithMostCalories.totalCalories < totalCalories) {
    elfWithMostCalories = { elfNumber, totalCalories };
  }
}

console.log(
  `\n\nElf ${
    elfWithMostCalories.elfNumber + 1
  } is carrying the most calories: ${elfWithMostCalories.totalCalories}`
);
