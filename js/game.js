'use strict'
const BOARD_SIZE = 14
var ALIENS_ROW_LENGTH = 8
var ALIENS_ROW_COUNT = 3

const HERO = '🦸‍♂️'
const ALIEN = '👽'
const LASER = '⚡'
const SUPER_LASER = '💥'
const SKY = 'SKY'
const FLOOR = 'FLOOR'
const CANDY = '🍬'


var gIntervalCandy
var gSetTimeOutCandy
var gBoard
var gGame

function init() {
    // gSuperCount = 0

    gGame = {
        isOn: true,
        score: 0,
        aliensCount: 0,
    }
    if (gIntervalAliens) clearInterval(gIntervalAliens)
    if (gIntervalLaser) clearInterval(gIntervalLaser)
    if (gIntervalCandy) clearInterval(gIntervalCandy)
    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    gSuperCount = 0
    updateSuperCount(3)
    updateScore(0)
    hideEl('.modal')
    hideEl('.game-over')
    showEl('.game-container')
    gIntervalCandy = setInterval(creatCandy, 10000)

}


function createBoard() {
    var size = BOARD_SIZE
    const board = []
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell()
            if (i === size - 1) {
                board[i][j].type = FLOOR
            }
        }
    }
    return board
}


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var cellClass = `cell cell-${i}-${j}`

            if (currCell.type === SKY) cellClass += ' sky'
            if (currCell.type === FLOOR) cellClass += ' floor'

            strHTML += `<td data-i="${i}" data-j="${j}" class="${cellClass}">`

            if (currCell.gameObject === ALIEN) strHTML += ALIEN
            else if (currCell.gameObject === HERO) strHTML += HERO
            else if (currCell.gameObject === LASER) strHTML += LASER
            else if (currCell.gameObject === SUPER_LASER) strHTML += SUPER_LASER
            else if (currCell.gameObject === CANDY) strHTML += CANDY

            strHTML += `</td >`

        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}




function getEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.type === FLOOR || currCell.gameObject === ALIEN ||
                currCell.gameObject === HERO || currCell.i > 1) continue
            emptyCells.push({ i, j })
        }
    }
    return emptyCells
}


function creatCandy() {
    var emptyCells = getEmptyCells()
    var pos = emptyCells[getRandomInt(0, BOARD_SIZE - 1)]
    updateCell({ i: pos.i, j: pos.j }, CANDY)
    gSetTimeOutCandy = setTimeout(() => { updateCell({ i: pos.i, j: pos.j }, '') }, 5000)
}

function changeLevel(level) {
    if (level === 'easy') {
        ALIENS_ROW_LENGTH = 6
        ALIENS_ROW_COUNT = 3
        ALIEN_SPEED = 600
    }
    if (level === 'medium') {
        ALIENS_ROW_LENGTH = 9
        ALIENS_ROW_COUNT = 3
        ALIEN_SPEED = 400
    }
    if (level === 'hard') {
        ALIENS_ROW_LENGTH = 9
        ALIENS_ROW_COUNT = 4
        ALIEN_SPEED = 300
    }


    init(ALIENS_ROW_LENGTH, ALIENS_ROW_COUNT, ALIEN_SPEED)

}


function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].gameObject === ALIEN) return
        }
    }
    victory()
}


function victory() {
    resetGame()
    showEl('.modal')
    playSound('win', 'wav')
}


function gameOver() {
    resetGame()
    showEl('.game-over')
    playSound('game over', 'wav')
}


function resetGame() {
    hideEl('.game-container')
    if (gIntervalAliens) clearInterval(gIntervalAliens)
    if (gIntervalLaser) clearInterval(gIntervalLaser)
    if (gIntervalCandy) clearInterval(gIntervalCandy)
    if (gSetTimeOutCandy) clearTimeout(gSetTimeOutCandy)
    gGame.aliensCount = 0
    gGame.score = 0
}
