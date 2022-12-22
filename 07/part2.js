const getInput = require("../getInput");
const { FileTree, initTree } = require("./Tree");
const data = getInput("input.txt")
  .split("\n")
  .map(command => command.split(" "));

const tree = FileTree();
const diskSpace = 70000000;
const minDiskSpaceToRunUpdate = 30000000;
const branchesSize = [];

const calculateSize = function (file) {
  if (!file.getChildrenFiles().length) {
    return parseInt(file.getSize());
  }

  let size = 0;

  file.getChildrenFiles().forEach(child => {
    return (size += calculateSize(child));
  });

  branchesSize.push(size);

  return size;
};

initTree(data, tree);

const unusedSpace = diskSpace - calculateSize(tree.getRoot());
let sizeOfBrunchToDelete = diskSpace - unusedSpace;

branchesSize.forEach(size => {
  if (unusedSpace + size >= minDiskSpaceToRunUpdate && size < sizeOfBrunchToDelete) {
    sizeOfBrunchToDelete = size;
  }
});

console.log(sizeOfBrunchToDelete);
