const { input } = require("./input");

const sortedCaloriesSum = input
  .split("\n\n")
  .map(elf => {
    return elf
      .split("\n")
      .map(calories => parseInt(calories))
      .reduce((a, b) => a + b);
  })
  .sort((a, b) => b - a);

console.log(sortedCaloriesSum[0]);
console.log(sortedCaloriesSum.slice(0, 3).reduce((a, b) => a + b));
