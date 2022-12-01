import { readFileSync } from 'fs';

export const readInput = (relativePath: string) => {
  return readFileSync(`inputs/${relativePath}`).toString();
};
