const getInput = require("../getInput");
const data = getInput("input.txt");
const startOf = 14;

const findSignalMarker = function (currentIndex, text, numberOfCharacterToCheck) {
  if (!numberOfCharacterToCheck) {
    return currentIndex;
  }

  if (!text.length) {
    return -1;
  }

  if (text.substring(1, numberOfCharacterToCheck).indexOf(text[0]) === -1) {
    return findSignalMarker(++currentIndex, text.substring(1), --numberOfCharacterToCheck);
  } else {
    return findSignalMarker(++currentIndex, text.substring(1), startOf);
  }
};

const result = findSignalMarker(0, data, startOf);
console.log(result);
