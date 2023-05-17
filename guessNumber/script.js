'use strict';

const guessMessage = document.querySelector('.guess-message');
const numberInput = document.querySelector('.number-input');
const question = document.querySelector('.question');
const score = document.querySelector('.score');

let scoreQt = 20;

const secretNumber = Math.trunc(Math.random() * 20) + 1;
question.textContent = secretNumber;

document.querySelector('.check').addEventListener('click', e => {
  const guessingNumber = Number(numberInput.value);

  if (!guessingNumber) {
    guessMessage.textContent = 'Введите число!';
  } else if (guessingNumber === secretNumber) {
    guessMessage.textContent = 'Правильно!';
  } else if (guessingNumber > secretNumber) {
    if (scoreQt > 1) {
      guessMessage.textContent = 'Слишком много!';
      scoreQt--;
      score.textContent = scoreQt;
    } else {
      guessMessage.textContent = 'Game Over!';
      score.textContent = 0;
    }
  } else if (guessingNumber < secretNumber) {
    if (scoreQt > 1) {
      guessMessage.textContent = 'Слишком мало!';
      scoreQt--;
      score.textContent = scoreQt;
    } else {
      guessMessage.textContent = 'Game Over!';
      score.textContent = 0;
    }
  }
});
