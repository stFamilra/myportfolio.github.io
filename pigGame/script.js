'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

score0Element.textContent = 0;
score1Element.textContent = 0;

diceElement.classList.add('hidden');

const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let currentActivePlayer;
let gameStop = false; //false - game is stoping; true - game continue;

let diceNumber;
let wonPlayer;

const getDiceNumber = () => {
  diceNumber = Math.trunc(Math.random() * 6) + 1;
};
const switchPlayer = () => {
  currentScore = 0;
  currentActivePlayer.textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener('click', e => {
  if (!gameStop) {
    currentActivePlayer = document.querySelector(`#current--${activePlayer}`);
    // Generate a random number
    getDiceNumber();

    // Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;

    // If the number is 1, switch to the next player; if not - add number to the current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      currentActivePlayer.textContent = currentScore;
    } else {
      // player0.classList.toggle('player--active');
      // player1.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', e => {
  // add current score to active player total score
  if (!gameStop) {
    totalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];
  }

  // If total score of active player >= 100, active player won; if not - switch player
  if (totalScores[activePlayer] >= 100) {
    wonPlayer = activePlayer;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    gameStop = true;
    diceElement.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', () => {
  totalScores[0] = 0;
  totalScores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  document
    .querySelector(`.player--${wonPlayer}`)
    .classList.remove('player--winner');

  gameStop = false;

  if (!player0.classList.contains('player--active')) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }
});
