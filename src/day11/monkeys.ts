import { readInput } from '../util/input';

const input = readInput('day11/monkeys.txt').trim();

const getUpdateWorryFn = (value1, operation, value2) => (old) => {
  let v1 = value1 === 'old' ? old : parseInt(value1);
  let v2 = value2 === 'old' ? old : parseInt(value2);
  let op = (a, b) => (operation === '*' ? a * b : a + b);

  return op(v1, v2);
};

const getThrowToFn =
  (divisor, trueMonkeyNumber, falseMonkeyNumber) => (item) => {
    const isDivisible = item % divisor === 0;
    const throwTo = isDivisible ? trueMonkeyNumber : falseMonkeyNumber;
    return throwTo;
  };

const parseMonkeys = () => {
  let supermod = 1;

  const monkeys = input.split('\n\n').map((monkeyInput) => {
    const [itemsLine, operationLine, testLine, testTrueLine, testFalseLine] =
      monkeyInput.split('\n').slice(1);

    const items = itemsLine.match(/\d+/g).map((item) => parseInt(item));

    let [value1, operation, value2] = operationLine
      .match(/([\w\d]+) ([*+]) ([\w\d]+)/)
      .slice(1);
    let updateWorry = getUpdateWorryFn(value1, operation, value2);

    let testDivisor = parseInt(testLine.match(/\d+/)[0]);
    const trueMonkey = parseInt(testTrueLine.match(/\d+/)[0]);
    const falseMonkey = parseInt(testFalseLine.match(/\d+/)[0]);
    let throwTo = getThrowToFn(testDivisor, trueMonkey, falseMonkey);

    supermod *= testDivisor;

    return {
      items,
      updateWorry,
      throwTo,
      inspected: 0,
    };
  });

  return { monkeys, supermod };
};

const problem1WorryManager = (worry) => Math.floor(worry / 3);
const problem2WorryManager = (worry, supermod) => worry % supermod;
const calculateMonkeyBusiness = (monkeys) =>
  monkeys
    .sort((m1, m2) => m2.inspected - m1.inspected)
    .slice(0, 2)
    .reduce((product, monkey) => product * monkey.inspected, 1);

const solve = (problem: 'problem1' | 'problem2', rounds) => {
  const { monkeys, supermod } = parseMonkeys();

  for (let round = 0; round < rounds; round++) {
    monkeys.forEach((monkey) => {
      monkey.items.forEach((worry) => {
        monkey.inspected++;
        worry = monkey.updateWorry(worry);
        worry =
          problem === 'problem1'
            ? problem1WorryManager(worry)
            : problem2WorryManager(worry, supermod);
        const throwTo = monkey.throwTo(worry);
        monkeys[throwTo].items.push(worry);
      });

      monkey.items = [];
    });
  }

  const monkeyBusiness = calculateMonkeyBusiness(monkeys);

  console.log(monkeyBusiness);
};

solve('problem1', 20);
solve('problem2', 10000);
