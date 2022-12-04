const getInput = require("../getInput");

const firstLowercaseCode = 97;
const firstUppercaseCode = 65;
const minLowercasePriority = 1;
const minUppercasePriority = 27;

const calculatePriority = characterCode => {
  if (characterCode < firstLowercaseCode) {
    return characterCode - firstUppercaseCode + minUppercasePriority;
  }

  return characterCode - firstLowercaseCode + minLowercasePriority;
};

const findElvesBadgeCode = elvesGroup => {
  const measure = elvesGroup[0];

  for (i = 0; i < measure.length; ++i) {
    if (elvesGroup[1].includes(measure[i]) && elvesGroup[2].includes(measure[i])) {
      return measure.charCodeAt(i);
    }
  }
};

const mergeEveryThreeElemets = array => {
  const newArray = [];

  for (i = 0; i < array.length; i += 3) {
    newArray.push([array[i], array[i + 1], array[i + 2]]);
  }

  return newArray;
};

const data = getInput("input.txt").split("\n");
const elvesGroup = mergeEveryThreeElemets(data);

const badgesSum = elvesGroup
  .map(element => {
    return calculatePriority(findElvesBadgeCode(element));
  })
  .reduce((a, b) => a + b);

console.log(badgesSum);
