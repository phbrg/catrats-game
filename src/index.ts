// consts
const btns = {
    btnStart: document.querySelector('#start') as HTMLButtonElement,
    btnReload: document.querySelector('#reload') as HTMLButtonElement,
    btnShoot: document.querySelector('#shoot') as HTMLButtonElement,
    btnHide: document.querySelector('#hide') as HTMLButtonElement,
}

const msgContainer = document.querySelector('.game-container') as HTMLDivElement

const printStats = {
    playerLife: document.querySelector('.player-life') as HTMLParagraphElement,
    playerAmmo: document.querySelector('.player-ammo') as HTMLParagraphElement,
    ratLife: document.querySelector('.rat-life') as HTMLParagraphElement,
    ratAmmo: document.querySelector('.rat-ammo') as HTMLParagraphElement,
} 

// characters
class character {
    constructor(
        public readonly type: string,
        public life: number,
        public ammo: number,
    ) {}
}

const player = new character('player', 100, 0);
const rat = new character('rat', 100, 0);

// game start
let gameStarted = false;

btns.btnStart.addEventListener('click', () => {
    if(gameStarted == false) {
        gameStarted = true;

        playerMessage('ready to the battle?');
        ratMessage(`i'm always ready.`);

        playerLife('print');
        playerAmmo('print');
        ratLife('print');
        ratAmmo('print');
    } else {
        alerta('Game alredy started.', 3000);
    }
})

// round system
let playerRound = true;

btns.btnReload.addEventListener('click', () => {
    if(gameStarted == true && playerRound == true) {
        playerAmmo('reload');
        
        playerRound = false;
        
        playerMessage('Cat reloaded.');
        
        ratAction();

        roundReset()
    } else {
        alerta('You need to await to do it.', 3000);
    }
})

// player actions
btns.btnShoot.addEventListener('click', () => {
    if(gameStarted == true && playerRound == true && player.ammo >= 1) {
        if(ratHide == true) {
            playerMessage('Cat missed the shot.');
        } else {
            playerMessage('Cat shooted the rat.');
            ratLife('down');
        }

        playerAmmo('shoot');

        playerRound = false;

        ratAction();

        roundReset();
    } else {
        alerta('You need to await to do it.', 3000);
    }
})


let playerHide = false;

btns.btnHide.addEventListener('click', () => {
    if(gameStarted == true && playerRound == true) {
        playerHide = true;

        playerRound = false;

        playerMessage('Cat hid.');

        ratAction();

        roundReset();
    } else {
        alerta('You need to await to do it.', 3000);
    }
})

function playerLife(type: string): void {
    if(type == 'down') {
        player.life -= 25;
        const newLife = player.life.toString();
        printStats.playerLife.innerText = newLife;
    } else if(type == 'print') {
        const newLife = player.life.toString();
        printStats.playerLife.innerText = newLife;
    }
}

function playerAmmo(type: string): void {
    if(type == 'reload') {
        player.ammo += 1;
        const newAmmo = player.ammo.toString();
        printStats.playerAmmo.innerText = newAmmo;
    } else if(type == 'shoot') {
        player.ammo -= 1;
        const newAmmo = player.ammo.toString();
        printStats.playerAmmo.innerText = newAmmo;
    } else if(type == 'print') {
        const newAmmo = player.ammo.toString();
        printStats.playerAmmo.innerText = newAmmo;
    }
}

// rat actions 
let ratHide = false;

function ratHideAct() {
    ratHide = true;

    ratMessage('Rat hid.');
}

function ratLife(type: string): void {
    if(type == 'down') {
        rat.life -= 25;
        const newRLife = rat.life.toString();
        printStats.ratLife.innerText = newRLife;
    } else if(type == 'print') {
        const newRLife = rat.life.toString();
        printStats.ratLife.innerText = newRLife;
    }
}

function ratAmmo(type: string): void {
    if(type == 'reload') {
        rat.ammo += 1;
        const newRAmmo = rat.ammo.toString();
        printStats.ratAmmo.innerText = newRAmmo;

        ratMessage('Rat reloaded.');
    } else if(type == 'shoot') {
        rat.ammo -= 1;
        const newRAmmo = rat.ammo.toString();
        printStats.ratAmmo.innerText = newRAmmo;
    } else if(type == 'print') {
        const newRAmmo = rat.ammo.toString();
        printStats.ratAmmo.innerText = newRAmmo;
    }
}

function ratAction(): void {
    const act = Math.floor(Math.random() * (100-1) + 1);

    if(rat.ammo == 0) {
        ratAmmo('reload');

        playerRound = true;
    } else {
        if(act <= 30) {
            ratAmmo('reload');
    
            playerRound = true;
        } else if(act >= 31 && act <= 60) {
            ratAmmo('shoot');
    
            if(playerHide == true) {
                ratMessage('Rat missed the shot.');
    
                playerRound = true;
            } else if (playerHide == false) {
                ratMessage('Rat shooted the Cat.');
    
                playerLife('down');
    
                playerRound = true;
            }
        } else if (act >= 61) {
            ratHideAct();
            
            playerRound = true;
        }
    }
}

function roundReset(): void {
    playerHide = false;
    ratHide = false;

    if(player.life <= 0) {
        alerta('The rat win this time.', 3000);

        gameStarted = false;

        newGame();
    } else if(rat.life <= 0) {
        alerta('The cat win this time.', 3000);

        gameStarted = false;

        newGame();
    }
}

function newGame(): void {
    while (msgContainer.firstChild) {
        msgContainer.removeChild(msgContainer.firstChild);
    }

    player.life = 100;
    rat.life = 100;
    player.ammo = 0;
    rat.ammo = 0;
}

// messages
function playerMessage(message: string): void {
    const createMessage = document.createElement('p');
    msgContainer.appendChild(createMessage);
    createMessage.setAttribute('class', 'player-msg');
    
    createMessage.innerHTML = `🐱‍👤 | ${message}`;
}

function ratMessage(message: string): void {
    const createMessage = document.createElement('p');
    msgContainer.appendChild(createMessage);
    createMessage.setAttribute('class', 'rat-msg');
    
    createMessage.innerHTML = `🐭 | ${message}`;
}

// alert
function alerta(message: string, time: number): void {
    const createAlert = document.createElement('p');
    createAlert.setAttribute('class', 'alert');
    document.body.appendChild(createAlert);
    createAlert.innerHTML = message;

    setTimeout(() => {
        createAlert.remove();
    }, time)
}