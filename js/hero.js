'use strict'

const LASER_SPEED = 80
var gHero
var gIntervalLaser

// creates the hero and place it on board 
function createHero(gBoard) {
    gHero = { pos: { i: 12, j: 5 }, isShoot: false }
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = HERO
}
// Handle game keys 
function onKeyDown(event) {

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j
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
            break
        default:
            return null
    }
    return nextLocation
}

// Move the hero right (1) or left (-1) 

function moveHero(nextLocation) {

    if (nextLocation.j < 0 || nextLocation.j > gBoard.length - 1) return

    updateCell(gHero.pos, '')
    updateCell(nextLocation, HERO)
    gHero.pos = nextLocation

}
// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot(nextLocation) {
    if (gHero.isShoot) return
    clearInterval(gIntervalLaser)
    gIntervalLaser = setInterval(() => { blinkLaser(nextLocation) }, LASER_SPEED)
}
// renders a LASER at specific cell for short time and removes it 
function blinkLaser(nextLocation) {
    gHero.isShoot = true
    if (nextLocation.i === 0) {
        updateCell(nextLocation, '')
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        return
    }

    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })
    
    if (nextCell.innerText === ALIEN) {
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
    updateCell(nextLocation, LASER)
}