'use strict';

const guessMessage = document.querySelector('.guess-message');
const numberInput = document.querySelector('.number-input');
const question = document.querySelector('.question');
const score = document.querySelector('.score');
const body = document.querySelector('body');
const highScore = document.querySelector('.highscore');

let scoreQt = 20;
let bestResult = 0;

/** functions **/
const getSecretNumber = () => {
  let result = Math.trunc(Math.random() * 20) + 1;
  return result;
};

const displayGuessMessage = message => (guessMessage.textContent = message);

let secretNumber = getSecretNumber();

// console.log(secretNumber);
document.querySelector('.check').addEventListener('click', e => {
  const guessingNumber = Number(numberInput.value);

  /* NO UNPUT */

  if (!guessingNumber) {
    displayGuessMessage('Введите число!');

    /* PLAYER WON */
  } else if (guessingNumber === secretNumber) {
    displayGuessMessage('Правильно!');
    question.textContent = secretNumber;
    // body.style.backgroundColor = 'rgb(9, 250, 21)';
    // question.style.width = '50rem';
    body.classList.add('body-win');
    question.classList.add('question-win');
    if (bestResult < scoreQt) {
      bestResult = scoreQt;
      highScore.textContent = bestResult;
    }
  } else if (guessingNumber !== secretNumber) {
    if (scoreQt > 1) {
      displayGuessMessage(
        guessingNumber > secretNumber ? 'Слишком много!' : 'Слишком мало!'
      );
      scoreQt--;
      score.textContent = scoreQt;
    } else {
      displayGuessMessage('Game Over!');
      score.textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', e => {
  if (
    body.classList.contains('body-win') &&
    question.classList.contains('question-win')
  ) {
    body.classList.remove('body-win');
    question.classList.remove('question-win');
  }
  question.textContent = '???';
  scoreQt = 20;
  score.textContent = scoreQt;
  displayGuessMessage('Начни угадывать!');
  numberInput.value = '';
  secretNumber = getSecretNumber();
  // console.log(secretNumber);
});
