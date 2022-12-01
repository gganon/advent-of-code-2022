import { insertInSortedArray } from './sort';

const sortedArray = [2, 3, 4, 5];

const newItem = 6;

const comparitor = (a, b) => a - b;

console.log(insertInSortedArray([1, 2, 3, 5, 6], 4, comparitor));

console.log(insertInSortedArray([2, 3, 4, 5, 6], 1, comparitor));

console.log(insertInSortedArray([1, 2, 3, 4, 5], 6, comparitor));
