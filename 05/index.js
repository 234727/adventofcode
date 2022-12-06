const getInput = require("../getInput");
const data = getInput("input.txt").split("\n");

function Command(qty, from, to) {
  return {
    qty,
    from,
    to
  };
}

const commands = [];

const stocks = data
  .filter(row => /^(\s*[0-9]+\s*)+$/.test(row))[0]
  .split("")
  .map((stockIndex, index) => {
    return { stockIndex, index, data: [] };
  })
  .filter(row => /[0-9]/.test(row.stockIndex));

data
  .filter(row => {
    return row.search(/\[([^\]]+)]/) !== -1;
  })
  .map(row => {
    return row
      .split("")
      .map((item, index) => {
        return { item, index };
      })
      .filter(row => /[a-zA-Z]/.test(row.item));
  })
  .flat()
  .forEach(element => {
    stocks.find(stock => stock.index === element.index).data.push(element.item);
  });

data
  .filter(row => row.search("move") !== -1)
  .map(row => {
    return row.split(" ");
  })
  .forEach(row => {
    commands.push(Command(row[1], row[3], row[5]));
  });

const moveBetweenStock = function ({ qty, from, to }, part = 1) {
  from = stocks.find(stock => stock.stockIndex === from);
  to = stocks.find(stock => stock.stockIndex === to);

  if (part === 1) {
    for (i = 0; i < qty; ++i) {
      if (!from.data.length) break;

      to.data.unshift(from.data[0]);
      from.data.shift();
    }
  } else {
    if (qty > from.data.length) qty = from.data.length;

    for (i = qty - 1; i >= 0; --i) {
      to.data.unshift(from.data[i]);
    }

    from.data = from.data.slice(qty);
  }
};

commands.forEach(command => {
  moveBetweenStock(command, 2);
});

let answer = "";
stocks.forEach(stock => (answer += stock.data[0]));
console.log(answer);
