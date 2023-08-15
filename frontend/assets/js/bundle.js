/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

const btns = {
    btnStart: document.querySelector('#start'),
    btnReload: document.querySelector('#reload'),
    btnShoot: document.querySelector('#shoot'),
    btnHide: document.querySelector('#hide'),
};
const msgContainer = document.querySelector('.game-container');
const printStats = {
    playerLife: document.querySelector('.player-life'),
    playerAmmo: document.querySelector('.player-ammo'),
    ratLife: document.querySelector('.rat-life'),
    ratAmmo: document.querySelector('.rat-ammo'),
};
class character {
    constructor(type, life, ammo) {
        this.type = type;
        this.life = life;
        this.ammo = ammo;
    }
}
const player = new character('player', 100, 0);
const rat = new character('rat', 100, 0);
let gameStarted = false;
btns.btnStart.addEventListener('click', () => {
    if (gameStarted == false) {
        gameStarted = true;
        playerMessage('ready to the battle?');
        ratMessage(`i'm always ready.`);
        playerLife('print');
        playerAmmo('print');
        ratLife('print');
        ratAmmo('print');
    }
    else {
        alerta('Game alredy started.', 3000);
    }
});
let playerRound = true;
btns.btnReload.addEventListener('click', () => {
    if (gameStarted == true && playerRound == true) {
        playerAmmo('reload');
        playerRound = false;
        playerMessage('Cat reloaded.');
        ratAction();
        roundReset();
    }
    else {
        alerta('You need to await to do it.', 3000);
    }
});
btns.btnShoot.addEventListener('click', () => {
    if (gameStarted == true && playerRound == true && player.ammo >= 1) {
        if (ratHide == true) {
            playerMessage('Cat missed the shot.');
        }
        else {
            playerMessage('Cat shooted the rat.');
            ratLife('down');
        }
        playerAmmo('shoot');
        playerRound = false;
        ratAction();
        roundReset();
    }
    else {
        alerta('You need to await to do it.', 3000);
    }
});
let playerHide = false;
btns.btnHide.addEventListener('click', () => {
    if (gameStarted == true && playerRound == true) {
        playerHide = true;
        playerRound = false;
        playerMessage('Cat hid.');
        ratAction();
        roundReset();
    }
    else {
        alerta('You need to await to do it.', 3000);
    }
});
function playerLife(type) {
    if (type == 'down') {
        player.life -= 25;
        const newLife = player.life.toString();
        printStats.playerLife.innerText = newLife;
    }
    else if (type == 'print') {
        const newLife = player.life.toString();
        printStats.playerLife.innerText = newLife;
    }
}
function playerAmmo(type) {
    if (type == 'reload') {
        player.ammo += 1;
        const newAmmo = player.ammo.toString();
        printStats.playerAmmo.innerText = newAmmo;
    }
    else if (type == 'shoot') {
        player.ammo -= 1;
        const newAmmo = player.ammo.toString();
        printStats.playerAmmo.innerText = newAmmo;
    }
    else if (type == 'print') {
        const newAmmo = player.ammo.toString();
        printStats.playerAmmo.innerText = newAmmo;
    }
}
let ratHide = false;
function ratHideAct() {
    ratHide = true;
    ratMessage('Rat hid.');
}
function ratLife(type) {
    if (type == 'down') {
        rat.life -= 25;
        const newRLife = rat.life.toString();
        printStats.ratLife.innerText = newRLife;
    }
    else if (type == 'print') {
        const newRLife = rat.life.toString();
        printStats.ratLife.innerText = newRLife;
    }
}
function ratAmmo(type) {
    if (type == 'reload') {
        rat.ammo += 1;
        const newRAmmo = rat.ammo.toString();
        printStats.ratAmmo.innerText = newRAmmo;
        ratMessage('Rat reloaded.');
    }
    else if (type == 'shoot') {
        rat.ammo -= 1;
        const newRAmmo = rat.ammo.toString();
        printStats.ratAmmo.innerText = newRAmmo;
    }
    else if (type == 'print') {
        const newRAmmo = rat.ammo.toString();
        printStats.ratAmmo.innerText = newRAmmo;
    }
}
function ratAction() {
    const act = Math.floor(Math.random() * (100 - 1) + 1);
    if (rat.ammo == 0) {
        ratAmmo('reload');
        playerRound = true;
    }
    else {
        if (act <= 30) {
            ratAmmo('reload');
            playerRound = true;
        }
        else if (act >= 31 && act <= 60) {
            ratAmmo('shoot');
            if (playerHide == true) {
                ratMessage('Rat missed the shot.');
                playerRound = true;
            }
            else if (playerHide == false) {
                ratMessage('Rat shooted the Cat.');
                playerLife('down');
                playerRound = true;
            }
        }
        else if (act >= 61) {
            ratHideAct();
            playerRound = true;
        }
    }
}
function roundReset() {
    playerHide = false;
    ratHide = false;
    if (player.life <= 0) {
        alerta('The rat win this time.', 3000);
        gameStarted = false;
        newGame();
    }
    else if (rat.life <= 0) {
        alerta('The cat win this time.', 3000);
        gameStarted = false;
        newGame();
    }
}
function newGame() {
    while (msgContainer.firstChild) {
        msgContainer.removeChild(msgContainer.firstChild);
    }
    player.life = 100;
    rat.life = 100;
    player.ammo = 0;
    rat.ammo = 0;
}
function playerMessage(message) {
    const createMessage = document.createElement('p');
    msgContainer.appendChild(createMessage);
    createMessage.setAttribute('class', 'player-msg');
    createMessage.innerHTML = `🐱‍👤 | ${message}`;
}
function ratMessage(message) {
    const createMessage = document.createElement('p');
    msgContainer.appendChild(createMessage);
    createMessage.setAttribute('class', 'rat-msg');
    createMessage.innerHTML = `🐭 | ${message}`;
}
function alerta(message, time) {
    const createAlert = document.createElement('p');
    createAlert.setAttribute('class', 'alert');
    document.body.appendChild(createAlert);
    createAlert.innerHTML = message;
    setTimeout(() => {
        createAlert.remove();
    }, time);
}

/******/ })()
;
//# sourceMappingURL=bundle.js.map