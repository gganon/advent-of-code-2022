import { readInput } from '../util/input';
const input = readInput('day10/instructions.txt').trim();

let signalStrengthSum = 0;

let output = new Array(6).fill(null).map(() => new Array(40).fill('.'));

const shouldLightUpPixel = (currentPixelPosition, spritePosition) =>
  Math.abs(currentPixelPosition - spritePosition) <= 1;

input
  .split('\n')
  .map((line) => {
    const [instruction, value] = line.split(' ');
    return [instruction, parseInt(value)] as [string, number];
  })
  .reduce(
    ({ cycle, x }, [instruction, value]) => {
      let nextInstructionCycle = cycle;
      let nextX = x;
      let lineNumber = Math.floor(cycle / 40);
      let position = (cycle % 40) - 1;

      if (instruction === 'noop') {
        nextInstructionCycle += 1;
      }

      if (instruction === 'addx') {
        nextInstructionCycle += 2;
        nextX += value;
      }

      // should light up this pixel?
      if (shouldLightUpPixel(position, x)) {
        output[lineNumber][position] = '#';
      }

      // if this is an addx instruction, check if the next cycle (which we're skipping over) also needs to be lit up
      let nextPosition = ((cycle + 1) % 40) - 1;
      if (instruction === 'addx' && shouldLightUpPixel(nextPosition, x)) {
        let nextLineNumber = Math.floor((cycle + 1) / 40);
        output[nextLineNumber][nextPosition] = '#';
      }

      // signal strength
      if ((cycle - 20) % 40 === 0) {
        signalStrengthSum += cycle * x;
      } else if ((nextInstructionCycle - 20) % 40 === 1) {
        signalStrengthSum += (cycle + 1) * x;
      }

      return { cycle: nextInstructionCycle, x: nextX };
    },
    { cycle: 1, x: 1 }
  );

console.log(signalStrengthSum);
console.log(output.map((line) => line.join('')).join('\n'));
