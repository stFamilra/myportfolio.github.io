'use strict';

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['CNY', 'Chinese yuan'],
]);

const transactions = [300, 250, -500, 5000, -750, -180, 50, 1400, -350, -120];
const usdToEuro = 0.91;
const transactionsPerEuro = transactions.map(current => current * 0.91);
console.log(transactionsPerEuro);

const withDrawals = transactions.filter(current => current < 0);
console.log(withDrawals);

const deposite = transactions.filter(current => current > 0);
console.log('deposite:', deposite);

// const sum = transactions.reduce((acc, value, index, arr) => {
//   console.log('acc:', acc);
//   console.log('value:', value);
//   console.log('index:', index);
//   console.log('arr:', arr);
//   return acc + value})

const sum = transactions.reduce((acc, value) => acc + value);

console.log('sum:', sum);

const min = transactions.reduce((acc, current) =>
  current < acc ? current : acc
);
console.log('min:', min);

const max = transactions.reduce((acc, current) =>
  current > acc ? current : acc
);
console.log('max:', max);

const mainBalanceInEuro = transactions
  .map(current => current * 0.91)
  .reduce((acc, current) => acc + current);
console.log(`balance in euro: ${mainBalanceInEuro}`);

const textToTitleCase = function (text) {
  const result = text
    .toLowerCase()
    .split(' ')
    .map(current =>
      current.length > 1 ? current[0].toUpperCase() + current.slice(1) : current
    )
    .join(' ');
  return result;
};

console.log(textToTitleCase('раБОТА с массивами в javascript'));
