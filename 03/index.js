// ASCII uppercase starts from 65
// ASCII lowercase starts from 97

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.

// find the character that appear in both halves in string
// calculate its priority
//  calculate the sum of priorities
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

const findRepetedCharacterCode = suplyString => {
  let firstHalf = suplyString.substring(0, suplyString.length / 2);
  let seconHalf = suplyString.substring(suplyString.length / 2);

  for (i = 0; i < firstHalf.length; ++i) {
    if (seconHalf.indexOf(firstHalf[i]) !== -1) {
      return firstHalf.charCodeAt(i);
    }
  }
};

const getInput = require("../getInput");
const data = getInput("input.txt")
  .split("\n")
  .map(backpack => {
    return calculatePriority(findRepetedCharacterCode(backpack));
  })
  .reduce((a, b) => a + b);

console.log(data);
