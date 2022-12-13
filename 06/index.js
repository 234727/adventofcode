const getInput = require("../getInput");
const data = getInput("input.txt");
const startOf = 14;

const findSignalMarker = function (text, numberOfCharacterToCheck) {
  if (!numberOfCharacterToCheck) {
    return 0;
  }

  if (text.substring(1, numberOfCharacterToCheck).indexOf(text[0]) === -1) {
    return 1 + findSignalMarker(text.substring(1), --numberOfCharacterToCheck);
  } else {
    return 1 + findSignalMarker(text.substring(1), startOf);
  }
};

const result = findSignalMarker(data, startOf);
console.log(result);
