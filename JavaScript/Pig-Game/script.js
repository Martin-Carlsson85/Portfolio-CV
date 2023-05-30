'use strict';

//Selecting elements
//El = Element
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`); // Klassnamn men utan punkt
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
//Buttons
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;

//Startvillkor
const init = function () {
  //Här sparas poängen
  scores = [0, 0]; //Poängen som visas under Player (final (total) poängen)
  currentScore = 0; //Kan inte vara inuti funktionen då det skulle generera 0 poäng varje gång man klickar på musen
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0; //JavaScript konverterar siffror till strängar här via textContent
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //Om den aktiva spelaren är noll ska den bli ett eller tvärtom
  currentScore = 0;
  player0El.classList.toggle(`player--active`); //Skiftar spelare så man ser vilken som är aktiv och inte
  player1El.classList.toggle(`player--active`);
};

//Funktion för att kasta tärningen
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //Function handler
    // 1.Här genereras tärningskastet varje gång som man trycker på knappen
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. Kolla om tärningen är lika med noll
    if (dice !== 1) {
      //Lägg till tärningens värde till befintligt värde(current score)
      currentScore = currentScore + dice; //Går även att skriva currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Förlorar alla våra poäng och det är nästa spelares tur
      //SKifta till andra spelaren
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Lägg till de nuvarande poängen (current) till aktiv spelares poäng
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Kolla om spelarens poäng är >= 100
    if (scores[activePlayer] >= 20) {
      // Spelet klart
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //Skifta till den andra spelaren
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
