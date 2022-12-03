const getInput = require("../getInput");

const scoreMap = {
  A: {
    X: 4,
    Y: 8,
    Z: 3
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6
  }
};

const secondStrategyMap = {
  A: {
    X: 3,
    Y: 4,
    Z: 8
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7
  }
};

const data = getInput("./input.txt").split("\n");

const calculateTheScore = function (inputData, strategyMap) {
  return inputData
    .map(score => {
      return score.split(" ").reduce((oponentKey, playerKey) => strategyMap[oponentKey][playerKey]);
    })
    .reduce((a, b) => a + b);
};

console.log(calculateTheScore(data, scoreMap));
console.log(calculateTheScore(data, secondStrategyMap));
