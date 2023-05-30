'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1; //Math = objekt, random = metod
// document.querySelector(`.number`).textContent = secretNumber; //Gör hemliga talet synligt när sidan laddas om

let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);

  //When there is no input
  if (!guess) {
    //document.querySelector(`.message`).textContent = `No number!`;
    displayMessage(`No number!`);

    //When guess is right
  } else if (guess === secretNumber) {
    displayMessage(`Correct number!`);
    document.querySelector(`.number`).textContent = secretNumber;
    document.querySelector(`body`).style.backgroundColor = `#60b347`;
    document.querySelector(`.number`).style.width = `30rem`;
    if (score > highScore) {
      highScore = score;
      document.querySelector(`.highscore`).textContent = highScore;
    }

    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score !== 1) {
      // document.querySelector(`.message`).textContent =
      //   guess > secretNumber ? `To high number!` : `To low!`;
      displayMessage(guess > secretNumber ? `To high number!` : `To low!`);
      score--;
      document.querySelector(`.score`).textContent = score;
    } else {
      displayMessage(`You lost!`);
      document.querySelector(`.score`).textContent = 0;
      document.querySelector(`body`).style.backgroundColor = `#ff0000`;
    }

    //   //When the guess is to high
    // } else if (guess > secretNumber) {
    //   if (score !== 1) {
    //     document.querySelector(`.message`).textContent = `To high number!`;
    //     score--;
    //     document.querySelector(`.score`).textContent = score;
    //   } else {
    //     document.querySelector(`.message`).textContent = `You lost`;
    //     document.querySelector(`.score`).textContent = 0;
    //   }

    //   //When guess is to low
    // } else if (guess < secretNumber) {
    //   if (score !== 1) {
    //     document.querySelector(`.message`).textContent = `To low number!`;
    //     score--;
    //     document.querySelector(`.score`).textContent = score;
    //   } else {
    //     document.querySelector(`.message`).textContent = `You lost`;
    //     document.querySelector(`.score`).textContent = 0;
    //     document.querySelector(`body`).style.backgroundColor = `#ff0000`;
    //   }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1; //Skapar ett nytt heligt nummer med samma variabel (reassign)
  displayMessage(`Start guessing...`);
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

//If no number

//If correct number

//If to low or to high number

//If you lost the game
