'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2023-08-28T15:15:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'CAD',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// const startCounter = () => {
//   const time = [5, 0];
//   setInterval(function () {
//     labelTimer.textContent = `${String(time[0]).padStart(2, 0)}:${String(
//       time[1]
//     ).padStart(2, 0)}`;
//     if (time[1] > 0) {
//       time[1]--;
//     } else {
//       time[0]--;
//       time[1] = 59;
//     }
//   }, 1000);
// };

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayTransaction = (account, sort = false) => {
  containerTransactions.innerHTML = '';

  const transacs = sort
    ? account.transactions.toSorted((x, y) => x - y)
    : account.transactions;

  console.log(transacs);

  transacs.forEach((trans, index) => {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.transactionsDates[index]);
    const day = `${date.getDate() + 1}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    const transDate = `${day}/${month}/${year}`;
    const howMuchAgo = Math.round((+new Date() - +date) / 1000 / 3600 / 24);
    const agoEndsWith = String(howMuchAgo).slice(-1);

    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );
    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}"> ${
      index + 1
    } ${transType === 'deposit' ? 'ДЕПОЗИТ' : 'ВЫВОД СРЕДСТВ'}
      </div> 
      <div class="transactions__date"> ${
        howMuchAgo < 1
          ? 'сегодня'
          : howMuchAgo === 1
          ? 'вчера'
          : +agoEndsWith === 0
          ? howMuchAgo + ' дней назад'
          : +agoEndsWith === 1
          ? howMuchAgo + ' день назад'
          : +agoEndsWith <= 4
          ? howMuchAgo + ' дня назад'
          : howMuchAgo + ' дней назад'
      }</div>
      <div class="transactions__value">${formattedTrans}</div>
    </div>`;

    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// const getNickname = name => {
// let result = (name.map((current) => (current.toLowerCase().split(' '))))
// result =  result.map(cur => cur.reduce((acc, next) => {return acc[0] + next[0]}))
// console.log(result)
// return result;
// }

const getNickname = name => {
  let userName = name;
  userName.forEach(current => {
    current.nickname = current.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
  console.log(userName);
};

getNickname(accounts);
console.log(accounts);

// const day = `${now.getDate()}`.padStart(2, '0');
// const month = `${now.getMonth() + 1}`.padStart(2, '0');
// const year = now.getFullYear();
// labelDate.textContent = `${day}/${month}/${year}`;

const displayBalance = user => {
  const balance = user.transactions.reduce(
    (acc, currentValue) => acc + currentValue
  );
  const formattedBalance = formatCurrency(balance, user.locale, user.currency);
  labelBalance.textContent = formattedBalance;

  user.balance = balance;
};

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  const formattedDepositesTotal = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  labelSumIn.textContent = formattedDepositesTotal;

  const withdrawalsTotal = Math.abs(
    account.transactions
      .filter(trans => trans < 0)
      .reduce((acc, trans) => acc + trans, 0)
  );

  const formattedWithdrawals = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  labelSumOut.textContent = formattedWithdrawals;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      // console.log(arr);
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0)
    .toFixed(2);

  const formattedInterest = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = formattedInterest;
};

const updateUi = account => {
  // display transactions
  displayTransaction(account);

  // display balance
  displayBalance(account);

  //display total
  displayTotal(account);
};

const closeUi = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Войдите в свой аккаунт';
};

const addTransactionDate = account => {
  const now = new Date();
  account.transactionsDates.push(now.toISOString());
};

let currentAccount, currentTimer;

const startTimer = () => {
  const timerCallback = () => {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');

    labelTimer.textContent = `${minutes}:${seconds}`;
    if (time < 1) {
      clearInterval(interval);
      closeUi();
    }
    time--;
  };
  let time = 300;

  // так как интервал начинает работать только через 1 секунду после авторизации, таймер срабатывает тоже не сразу. Поэтому мы отдельно вызываем функцию, чтобы при запуске интервала оставалось 19 секунд, а не 20.
  timerCallback();
  const interval = setInterval(timerCallback, 1000);

  // возвращаем сам интервал, чтобы мы могли его потом очистить.
  return interval;
};

const resetTimer = () => {
  // если таймер уже запущен, очищаем его
  if (currentTimer) {
    clearInterval(currentTimer);
  }
  currentTimer = startTimer();
};

btnLogin.addEventListener('click', e => {
  // if (inputLoginUsername.value  inputLoginPin
  e.preventDefault();
  currentAccount = accounts.find(
    currentValue => currentValue.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //display ui and welcome message
    containerApp.style.opacity = '1';

    labelWelcome.textContent = `We are glad to see you again,  ${
      currentAccount.userName.split(' ')[0]
    }`;
    // clear inputs
    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      weekday: 'long',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    resetTimer();
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const beneficiaryAccount = accounts.find(
    current => current.nickname === inputTransferTo.value
  );
  const transferAmount = +inputTransferAmount.value;

  // clear values of inputs
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    beneficiaryAccount &&
    currentAccount.nickname !== beneficiaryAccount.nickname
  ) {
    // change amount of current account
    currentAccount.transactions.push(-transferAmount);

    // add beneficiary amount

    beneficiaryAccount.transactions.push(transferAmount);
    addTransactionDate(currentAccount);
    addTransactionDate(beneficiaryAccount);
    resetTimer();
    updateUi(currentAccount);
  } else {
    console.log('Try again!');
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const deleteIndexAccounte = accounts.findIndex(
      current => current === currentAccount
    );
    accounts.splice(deleteIndexAccounte, 1);
    closeUi();
    console.log(accounts);
  }
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      current => current >= (loanAmount / 100) * 10
    )
  ) {
    // currentAccount.transactions.push(loanAmount);
    // addTransactionDate(currentAccount);
    // updateUi(currentAccount);
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      addTransactionDate(currentAccount);
      updateUi(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  resetTimer();
});

let transactionsSorted = false;

btnSort.addEventListener('click', e => {
  // e.preventDefault();
  displayTransaction(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
