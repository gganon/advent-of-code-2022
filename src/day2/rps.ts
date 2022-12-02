import { readInput } from '../util/input';

const input = readInput('day2/strategy.txt').trim();

type Shape = 'rock' | 'paper' | 'scissor';
type Outcome = 'win' | 'lose' | 'draw';

/**
 * parse A,B,C,X,Y,Z to rock, paper or scissor
 */
const shapeParseMap: Record<string, Shape> = {
  A: 'rock',
  B: 'paper',
  C: 'scissor',
  X: 'rock',
  Y: 'paper',
  Z: 'scissor',
};

/**
 * parse X,Y,Z to the required round outcome: win, lose or draw
 */
const outcomeParseMap: Record<string, Outcome> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

/**
 * given an opponent's selected shape and the required outcome (win, lose or draw), this map tells you what shape
 * you should select to get that outcome
 */
const outcomeMap: Record<Shape, Record<Outcome, Shape>> = {
  rock: {
    draw: 'rock',
    lose: 'scissor',
    win: 'paper',
  },
  paper: {
    draw: 'paper',
    lose: 'rock',
    win: 'scissor',
  },
  scissor: {
    draw: 'scissor',
    lose: 'paper',
    win: 'rock',
  },
};

/**
 * points for a selected shape
 */
const shapePointsMap: Record<Shape, number> = {
  rock: 1,
  paper: 2,
  scissor: 3,
};

/**
 * given the shape you selected (first level) and the shape your opponent selected (2nd level), tells you how many points
 * you will gain in that round
 */
const outcomePointsMap: Record<Shape, Record<Shape, number>> = {
  rock: {
    rock: 3,
    paper: 0,
    scissor: 6,
  },
  paper: {
    paper: 3,
    scissor: 0,
    rock: 6,
  },
  scissor: {
    scissor: 3,
    rock: 0,
    paper: 6,
  },
};

type Round = {
  myShape: Shape;
  opponentShape: Shape;
};

const parseShape = (input: string): Shape => {
  return shapeParseMap[input];
};

const parseOutcome = (input: string): Outcome => {
  return outcomeParseMap[input];
};

const parseLineProblem1 = (inputLine: string) => {
  const [opponentShape, myShape] = inputLine.split(' ');
  return {
    myShape: parseShape(myShape),
    opponentShape: parseShape(opponentShape),
  };
};

const parseLineProblem2 = (inputLine: string) => {
  const [opponentShape, outcome] = inputLine.split(' ');
  return {
    myShape: outcomeMap[parseShape(opponentShape)][parseOutcome(outcome)],
    opponentShape: parseShape(opponentShape),
  };
};

const calculateRoundScore = ({ myShape, opponentShape }: Round) => {
  return shapePointsMap[myShape] + outcomePointsMap[myShape][opponentShape];
};

/**
 * total score from problem 1
 */
const totalScore1 = input
  .split('\n')
  .map(parseLineProblem1)
  .map(calculateRoundScore)
  .reduce((totalScore, roundScore) => totalScore + roundScore, 0);

console.log(totalScore1);

/**
 * total score from problem 2
 */
const totalScore2 = input
  .split('\n')
  .map(parseLineProblem2)
  .map(calculateRoundScore)
  .reduce((totalScore, roundScore) => totalScore + roundScore, 0);

console.log(totalScore2);
