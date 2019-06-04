/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, prevDice, winningScore, isGamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isGamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var diceRoll = dice + dice1;
    console.log(prevDice + " " + diceRoll);

    // 2. Display the Result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    var diceDOM1 = document.querySelector(".dice1");
    diceDOM1.style.display = "block";
    diceDOM1.src = "dice-" + dice1 + ".png";

    // 3. Update the round score IF the rolled number is NOT 1
    if (dice !== 1 && dice1 !== 1) {
      // Add score
      roundScore += diceRoll;
      aggScore = scores[activePlayer] + roundScore;

      twelveChecker(prevDice, diceRoll);
      displayResults(aggScore);

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Add score from current round to averall score before player swap
      scores[activePlayer] += roundScore;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];

      // Swap player
      swapPlayer();
    }
    prevDice = diceRoll;
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function displayResults(aggScore) {
  if (aggScore >= winningScore) {
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice1").style.display = "none";
    document.querySelector("#score-" + activePlayer).textContent = aggScore;
    document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    isGamePlaying = false;
  }
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  prevDice = 0;
  winningScore = document.querySelector(".winnScore").value;
  document.getElementsByClassName("winnScore").innerHTML = winningScore;
  isGamePlaying = true;

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "PLAYER 1";
  document.getElementById("name-1").textContent = "PLAYER 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
}

function swapPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
}

function twelveChecker(prevDice, diceRoll) {
  if (prevDice === 12 && prevDice === diceRoll) {
    scores[activePlayer] = 0;
    roundScore = 0;
    document.querySelector("#score-" + activePlayer).textContent = "0";
    prevDice = 0;
    swapPlayer();
  }
}
