/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gameActive
var diceDOM, scoresDOM, currentScoresDOM, playerPanelsDOM

gameActive = true
scores = [0, 0]
roundScore = 0
activePlayer = 0

diceDOM = document.querySelector('.dice')

scoresDOM = [
  document.getElementById('score-0'),
  document.getElementById('score-1'),
]

currentScoresDOM = [
  document.getElementById('current-0'),
  document.getElementById('current-1'),
]

playerPanelsDOM = [
  document.querySelector('.player-0-panel'),
  document.querySelector('.player-1-panel'),
]

function resetGame() {
  gameActive = true
  scores = [0, 0]
  roundScore = 0
  activePlayer = 0
  playerPanelsDOM.forEach(el => {
    el.classList.remove('active')
    el.classList.remove('winner')
  })
  currentScoresDOM.forEach(el => {
    el.textContent = 0
  })
  scoresDOM.forEach(el => {
    el.textContent = 0
  })
  playerPanelsDOM[activePlayer].classList.add('active')
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'

  // CSS manipulation
  diceDOM.style.display = 'none'
}

function nextPlayer() {
  currentScoresDOM[activePlayer].textContent = roundScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  playerPanelsDOM.forEach(panel => {
    panel.classList.toggle('active')
  })
  diceDOM.style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', resetGame)

document.querySelector('.btn-roll').addEventListener('click', () => {
  //   console.log('this:', this) // {}
  //   console.log('target:', e.target) // btn element

  if (gameActive) {
    // randor is returning [0..1)
    dice = Math.floor(Math.random() * 6) + 1
    diceDOM.style.display = 'block' // visible again
    diceDOM.src = 'dice-' + dice + '.png'
    //   document.querySelector('#current-' + activePlayer).textContent = dice
    if (dice !== 1) {
      roundScore += dice
      currentScoresDOM[activePlayer].textContent = roundScore
    } else {
      nextPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gameActive) {
    scores[activePlayer] += roundScore
    scoresDOM[activePlayer].textContent = scores[activePlayer]
    if (scores[activePlayer] >= 100) {
      gameActive = false
      diceDOM.style.display = 'none'
      playerPanelsDOM[activePlayer].classList.remove('active')
      playerPanelsDOM[activePlayer].classList.add('winner')
      document.getElementById('name-' + activePlayer).textContent = 'Winner!'
    } else {
      nextPlayer()
    }
  }
})

// document.querySelector('.btn-roll').addEventListener('click', function() {
//   console.log(this) // this is the button element
// })
