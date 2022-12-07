import { readInput } from '../util/input';
import _ from 'lodash';

const input = readInput('day7/commands.txt').trim();

const { fileTree } = input
  .match(/\$[^\$]+/gm)
  .map((section) => {
    const command = section.match(/\$ (.*)/)[1];
    const output = section.slice(section.indexOf('\n') + 1);
    return [command, output];
  })
  .reduce(
    ({ fileTree, currDir }, [command, output]) => {
      if (command.startsWith('cd')) {
        const dir = command.split('cd ')[1];
        if (dir === '/') {
          currDir = ['/'];
        } else if (dir == '..') {
          currDir = currDir.slice(0, -1);
        } else {
          currDir = [...currDir, dir];
        }
      }

      if (command === 'ls') {
        const dir = _.get(fileTree, currDir);
        output
          .split('\n')
          .filter((line) => !!line)
          .forEach((line) => {
            if (line.startsWith('dir ')) {
              dir[line.split('dir ')[1]] = {};
              return;
            }

            const [_, size, filename] = line.match(/(\d+) (.*)/);
            dir[filename] = parseInt(size);
          });
      }
      return { fileTree, currDir };
    },
    { fileTree: { '/': {} }, currDir: null }
  );

console.log(JSON.stringify(fileTree, null, 2));

let dirSizes = [];

const calcDirectorySize = (tree) => {
  const files = Object.keys(tree);
  let size = 0;

  files.forEach((file) => {
    if (typeof tree[file] === 'number') {
      size += tree[file];
    } else {
      size += calcDirectorySize(tree[file]);
    }
  });

  dirSizes.push(size);

  return size;
};

const totalUsedSpace = calcDirectorySize(fileTree['/']);

dirSizes.sort((a, b) => a - b);

const total100KDirSizes = dirSizes
  .slice(
    0,
    dirSizes.findIndex((dirSize) => dirSize > 100000)
  )
  .reduce((total, size) => total + size, 0);

console.log(total100KDirSizes);

const freeSpaceAvailable = 70000000 - totalUsedSpace;
const spaceNeeded = 30000000;
const dirToDeleteSize = dirSizes.find(
  (size) => freeSpaceAvailable + size >= spaceNeeded
);

console.log(dirToDeleteSize);
