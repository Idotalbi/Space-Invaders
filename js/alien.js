'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze
var gIsRight

function createAliens(board) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            board[i][j].gameObject = ALIEN
            gGame.aliensCount++
        }
    }
    console.log('gGame.aliensCount:', gGame.aliensCount)
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = ALIENS_ROW_COUNT - 1
    gIsRight = false
    gIsAlienFreeze = false
    moveAliens()
}


function shiftBoardRight(board, fromI, toI) {
    if (gIsAlienFreeze) return
    for (var i = fromI; i <= toI; i++) {
        for (var j = board.length - 1; j >= 0; j--) {
            if (board[i][j].gameObject === ALIEN) {
                if (j === board.length - 1) {
                    gIsRight = true
                    clearInterval(gIntervalAliens)
                    gIntervalAliens = setInterval(() => { shiftBoardDown(board, gAliensTopRowIdx, gAliensBottomRowIdx) }, ALIEN_SPEED)
                    return
                }
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j + 1 }, ALIEN)
            }
        }
    }
}


function shiftBoardLeft(board, fromI, toI) {
    if (gIsAlienFreeze) return
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j <= board.length - 1; j++) {
            if (board[i][j].gameObject === ALIEN) {
                if (j === 0) {
                    gIsRight = false
                    clearInterval(gIntervalAliens)
                    gIntervalAliens = setInterval(() => { shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx) }, ALIEN_SPEED)
                    return
                }
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j - 1 }, ALIEN)
            }
        }
    }
}


function shiftBoardDown(board, fromI, toI) {
    if (gIsAlienFreeze) return
    for (var i = toI; i >= fromI; i--) {
        for (var j = 0; j <= board.length - 1; j++) {
            if (board[i + 1][j].gameObject === HERO) {
                clearInterval(gIntervalAliens)
                gameOver()
                return
            }
            if (board[i][j].gameObject === ALIEN) {
                clearInterval(gIntervalAliens)
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i + 1, j: j }, ALIEN)
            }
        }
    }
    gAliensTopRowIdx++
    gAliensBottomRowIdx++

    moveAliens()
}

function moveAliens() {
    if (gIsRight) {
        gIntervalAliens = setInterval(() => { shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx) }, ALIEN_SPEED)
    } else {
        gIntervalAliens = setInterval(() => { shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx) }, ALIEN_SPEED)
    }

}
