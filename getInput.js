const fs = require("fs");

const getInpt = filePath => {
  return fs.readFileSync(filePath).toString();
};

module.exports = getInpt;
