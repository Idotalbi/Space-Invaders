'use strict'

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

function updateSuperCount(count) {
    gSuperCount += count
    document.querySelector('.super-count').innerText = gSuperCount
}


function hideEl(selector) {
    var elModal = document.querySelector(selector)
    elModal.classList.add('hidden')
}

function showEl(selector) {
    var elModal = document.querySelector(selector)
    elModal.classList.remove('hidden')
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function playSound(name, type) {
    var sound = new Audio(`sound/${name}.${type}`)
    sound.play()
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}