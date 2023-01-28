'use strict'

const LASER_SPEED = 50
const SUPER_LASER_SPEED = 10

var gHero
var gIntervalLaser
var gBlowNegs
var gIsSuper
var gSuperCount
var gIsAlienFreeze

function createHero(gBoard) {
    gHero = { pos: { i: 12, j: 5 }, gIsSuper: false, isShoot: false, gBlowNegs: false, }
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO
    gSuperCount = 3
    // updateSuperCount(3)
}

function onKeyDown(event) {

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j,
    }

    switch (event.key) {
        case 'ArrowLeft':
            nextLocation.j--
            moveHero(nextLocation)
            break;
        case 'ArrowRight':
            nextLocation.j++
            moveHero(nextLocation)
            break;
        case ' ':
            nextLocation.i--
            shoot(nextLocation)
            event.preventDefault()
            break;
        case 'n':
            gBlowNegs = true
            break;
        case 'x':
            console.log(gSuperCount)
            if (gSuperCount === 0) return
            gIsSuper = true
            updateSuperCount(-1)
            nextLocation.i--
            shoot(nextLocation)
            break;
        default:
            return null
    }
    return nextLocation
}


function moveHero(nextLocation) {

    if (nextLocation.j < 0 || nextLocation.j > gBoard.length - 1) return

    updateCell(gHero.pos, '')
    updateCell(nextLocation, HERO)
    gHero.pos = nextLocation

}

function shoot(nextLocation) {
    if (gHero.isShoot) return
    if (gIsSuper) {
        gIntervalLaser = setInterval(() => { blinkLaser(nextLocation) }, SUPER_LASER_SPEED)
        playSound('superlaser', 'mp3')
    } else {
        gIntervalLaser = setInterval(() => { blinkLaser(nextLocation) }, LASER_SPEED)
        playSound('laser', 'wav')
    }

}

function blinkLaser(nextLocation) {
    gHero.isShoot = true
    if (nextLocation.i === 0) {
        updateCell(nextLocation, '')
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        gIsSuper = false
        return
    }
    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })
    if (nextCell.innerText === CANDY) {
        updateScore(50)
        gIsAlienFreeze = true
        gSetTimeOutCandy = setTimeout(() => {
            gIsAlienFreeze = false
        }, 5000)
        gHero.isShoot = false
        gIsSuper = false
    }

    if (nextCell.innerText === ALIEN) {
        if (gBlowNegs) {
            blowUpNegs(gBoard, nextLocation.i, nextLocation.j)
            gBlowNegs = false
        }
        if (gIsSuper) {
            gIsSuper = false
        }
        updateScore(10)
        updateLaser(nextLocation)
        nextCell.innerText = ''
        gHero.isShoot = false
        clearInterval(gIntervalLaser)
        checkVictory()
        return
    }
    updateLaser(nextLocation)
}

function updateLaser(nextLocation) {
    updateCell(nextLocation, '')
    nextLocation.i--
    if (gIsSuper) {
        updateCell(nextLocation, SUPER_LASER)
    } else {
        updateCell(nextLocation, LASER)
    }
}


function blowUpNegs(board, rowIdx, colIdx) {
    var negsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.gameObject === ALIEN) {
                negsCount++
                console.log('negsCount:', negsCount)
                updateCell({ i, j }, '')
            }
        }
    }
    gGame.aliensCount += negsCount
    updateScore((negsCount * 10) - 10)
}