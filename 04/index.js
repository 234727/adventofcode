const getInput = require("../getInput");

function Section(start, end) {
  return {
    start: parseInt(start),
    end: parseInt(end)
  };
}

const checkIfOverlaps = (section1, section2) => section1.start <= section2.end && section2.start <= section1.end;

const checkIfFullyOverlaps = (section1, section2) =>
  (section1.start <= section2.start && section2.end <= section1.end) ||
  (section2.start <= section1.start && section1.end <= section2.end);

const data = getInput("input.txt")
  .split("\n")
  .map(element => {
    return element.split(",").map(range => {
      return Section(range.split("-")[0], range.split("-")[1]);
    });
  })
  .map(sections => checkIfOverlaps(sections[0], sections[1]))
  .reduce((a, b) => a + b);

console.log(data);
