'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '🦸‍♂️'
const ALIEN = '👽'
const LASER = '⚡'
const SKY = 'SKY'
const FLOOR = 'FLOOR'
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard
var gGame

// Called when game loads 
function init() {
    if (gIntervalAliens) clearInterval(gIntervalAliens)
    if (gIntervalLaser) clearInterval(gIntervalLaser)
    gGame = {
        isOn: false,
        score: 0,
        aliensCount: 0,
    }
    gBoard = createBoard()
    // console.log('gBoard:', gBoard)
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    updateScore(0)
    hideEl('.modal')
    hideEl('.game-over')
    showEl('.game-container')
}
// Create and returns the board with aliens on top, ground at bottom 
// use the functions: createCell, createHero, createAliens  
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


// Render the board as a <table> to the page 
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

            strHTML += `</td >`

        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
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
}

function gameOver() {
    resetGame()
    showEl('.game-over')
}


function resetGame() {
    hideEl('.game-container')
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalLaser)
    gGame.aliensCount = 0
    gGame.score = 0
}