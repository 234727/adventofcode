const getInput = require("../getInput");
const { FileTree, initTree } = require("./Tree");
const data = getInput("input.txt")
  .split("\n")
  .map(command => command.split(" "));

const tree = FileTree();
const givenValue = 100000;
let sumOfBranchesSmallerThenGivenValue = 0;

const calculateSize = function (file) {
  if (!file.getChildrenFiles().length) {
    return parseInt(file.getSize());
  }

  let size = 0;

  file.getChildrenFiles().forEach(child => {
    return (size += calculateSize(child));
  });

  if (size < givenValue) {
    sumOfBranchesSmallerThenGivenValue += size;
  }

  return size;
};

initTree(data, tree);
calculateSize(tree.getRoot());

console.log(sumOfBranchesSmallerThenGivenValue);
