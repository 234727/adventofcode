const getInput = require("../getInput");
const data = getInput("input.txt")
  .split("\n")
  .map(element => element.split(""));

function Move(from, to, direction) {
  return {
    from,
    to,
    direction
  };
}

let visibleTrees = 0;
let topScoresOfCoveringTree = 0;

// add all trees from edges
visibleTrees += 2 * (data.length - 1) + 2 * (data[0].length - 1);

const isTreeVisibleInSelectedDirection = function ({ from, to, direction }, treeX, treeY, treesGrid) {
  let value;

  for (let i = from; i < to; ++i) {
    direction === "x" ? (value = treesGrid[i][treeY]) : (value = treesGrid[treeX][i]);

    if (value >= treesGrid[treeX][treeY]) {
      return false;
    }
  }

  return true;
};

const calculateTheCoveringTreeInSelectedDirections = function ({ from, to, direction }, treeX, treeY, treesGrid) {
  let coveringTrees = 0;
  let value;
  let iterator = from;

  while (iterator !== to) {
    switch (direction) {
      case "top":
        value = treesGrid[iterator][treeY];
        --iterator;
        break;
      case "bottom":
        value = treesGrid[iterator][treeY];
        ++iterator;
        break;
      case "left":
        value = treesGrid[treeX][iterator];
        --iterator;
        break;
      case "right":
        value = treesGrid[treeX][iterator];
        ++iterator;
        break;
    }

    ++coveringTrees;

    if (value >= treesGrid[treeX][treeY]) {
      return coveringTrees;
    }
  }

  return coveringTrees;
};

for (let i = 1; i < data.length - 1; ++i) {
  for (let j = 1; j < data[0].length - 1; ++j) {
    let currentResult = false;

    currentResult = currentResult || isTreeVisibleInSelectedDirection(Move(0, i, "x"), i, j, data);
    currentResult = currentResult || isTreeVisibleInSelectedDirection(Move(i + 1, data.length, "x"), i, j, data);
    currentResult = currentResult || isTreeVisibleInSelectedDirection(Move(0, j, "y"), i, j, data);
    currentResult = currentResult || isTreeVisibleInSelectedDirection(Move(j + 1, data[0].length, "y"), i, j, data);

    visibleTrees += currentResult;
  }
}

console.log(visibleTrees);

for (let i = 1; i < data.length - 1; ++i) {
  for (let j = 1; j < data[0].length - 1; ++j) {
    let currentCoveringTrees = 1;

    currentCoveringTrees *= calculateTheCoveringTreeInSelectedDirections(Move(i - 1, -1, "top"), i, j, data);
    currentCoveringTrees *= calculateTheCoveringTreeInSelectedDirections(
      Move(i + 1, data.length, "bottom"),
      i,
      j,
      data
    );
    currentCoveringTrees *= calculateTheCoveringTreeInSelectedDirections(Move(j - 1, -1, "left"), i, j, data);
    currentCoveringTrees *= calculateTheCoveringTreeInSelectedDirections(
      Move(j + 1, data[0].length, "right"),
      i,
      j,
      data
    );

    topScoresOfCoveringTree =
      currentCoveringTrees > topScoresOfCoveringTree ? currentCoveringTrees : topScoresOfCoveringTree;
  }
}

console.log(topScoresOfCoveringTree);
