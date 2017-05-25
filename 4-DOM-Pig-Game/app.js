/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying, userInput;

init();

var lastDice;

// var  =
// var  =

// var x = document.querySelector('#score-0').textContent;

document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying) {

    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. Display result
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    // update img
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    if (dice === 6 && lastDice === 6) {
      //Player looses score
      score[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1 && dice2 !== 1) {
      // 3. Update round score only if result is NOT equal to 1
      //Add score
      lastDice = dice;
      roundScore += dice + dice2;
      // display updateed score
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying) {
    // add current score to global score
    score[activePlayer] += roundScore;
    lastDice = 0;
    var winningScore = document.getElementById('set-score').value;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

    // check if the player won the game
    if (score[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  roundScore = 0;
  lastDice = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

// Start new game
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  score = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  lastDice = 0;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('name-0').textContent = 'player 1';
  document.getElementById('name-1').textContent = 'player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}
