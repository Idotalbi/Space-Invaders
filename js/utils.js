'use strict'

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) {
  return {
    type: SKY,
    gameObject: gameObject,
  }
}


function getElCell(pos) {
  return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}


function updateScore(score) {
  gGame.score += score
  document.querySelector('.score').innerText = gGame.score
}


function hideEl(selector) {
  var elModal = document.querySelector(selector)
  elModal.classList.add('hidden')
}

function showEl(selector) {
  var elModal = document.querySelector(selector)
  elModal.classList.remove('hidden')
}

function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject
  var elCell = getElCell(pos)
  elCell.innerHTML = gameObject || ''
}