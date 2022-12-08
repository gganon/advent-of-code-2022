import { readInput } from '../util/input';
const input = readInput('day8/trees.txt').trim();

const rows = input.split('\n');
let maxInteriorLength = rows[0].length - 1;
let maxInteriorHeight = rows.length - 1;

let visible = rows[0].length * 2 + rows.length * 2 - 4;
let maxScenicScore = 0;

const calcScenicScore = (height: string, trees: string[]) => {
  const index = trees.findIndex((tree) => tree >= height);
  return index === -1 ? trees.length : index + 1;
};

for (let i = 1; i < maxInteriorHeight; i++) {
  for (let j = 1; j < maxInteriorLength; j++) {
    const treeHeight = rows[i][j];

    const left = Array.from(rows[i].slice(0, j)).reverse();
    const right = Array.from(rows[i].slice(j + 1));
    const col = rows.map((row) => row[j]);
    const top = col.slice(0, i).reverse();
    const bottom = col.slice(i + 1);

    const smaller = (height) => height < treeHeight;
    const isVisible =
      left.every(smaller) ||
      right.every(smaller) ||
      top.every(smaller) ||
      bottom.every(smaller);

    const scenicScore =
      calcScenicScore(treeHeight, top) *
      calcScenicScore(treeHeight, left) *
      calcScenicScore(treeHeight, right) *
      calcScenicScore(treeHeight, bottom);

    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }

    if (isVisible) {
      visible++;
    }
  }
}

console.log(visible);
console.log(maxScenicScore);
