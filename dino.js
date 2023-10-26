
const gameBoard = document.querySelector("#game-board")
const startArea = document.querySelector("#start-area")
const gameArea = document.querySelector("#game-area")
const finishArea = document.querySelector("#finish-area")
const title = document.querySelector(".title")
const button = document.querySelector(".button")
let gameOn = false;

button.addEventListener("click", () => startGame())

function startGame() {
    gameOn = true; 
    newPlayer() 
    button.remove()
    title.remove()
    GameLoop()
}


class Dino {
    constructor(image) {
        this.image = image;
        this.dinoPositionX = 0
        this.element = this.createDinoElement()
    }
    createDinoElement() {
        const element = document.createElement("div");
        element.style.backgroundImage = `url(${this.image})`
        element.className = "dino";
        startArea.appendChild(element)
        // gameBoard.appendChild(element)
        return element;
    }
}

let dino;
const arrayOfDinBackgrounfimage = ["images/dinossiluhettes/trexright.png", "images/dinossiluhettes/dinoright.png", "images/dinossiluhettes/dino2right.png", "images/dinossiluhettes/dino3right.png", "images/dinossiluhettes/tricepright.png", "images/dinossiluhettes/velciright.png"]
const dinosArray = []
const savedDinosArray = []

function createNewDino() {
    arrayOfDinBackgrounfimage.forEach(aImage => {
        const dino = new Dino(aImage);
        dinosArray.push(dino)
    });
}
createNewDino()
function newPlayer() {
    gameArea.appendChild(dinosArray[dinosArray.length - 1].element)
    dino = dinosArray[dinosArray.length - 1]
    dino.element.style.top = `440px`
    dino.element.style.height = `100px`
    dino.element.style.width = `100px`
    dinosArray.pop();
}

class Enemy {
    constructor(areaWidth, areaHeight, element) {
        this.enemyElement = element;
        this.areaWidth = areaWidth;
        this.areaHeight = areaHeight;
        this.width = 30;
        this.height = 70;
        //this.isfalling = true;
        this.verticalPosition = 0;
        this.horizontalPosition = Math.floor(Math.random() * (areaWidth - this.width));
        this.enemyElement.style.width = `${this.width} px`;
        this.enemyElement.style.height = `${this.height} px`;
        this.enemyElement.style.left = `${this.horizontalPosition}px`;
    }
}



function moveDino(event) {
    if (event.key === "ArrowLeft") {
        dino.element.classList.replace("dino", "dino-left")
        if (dino.dinoPositionX === 0) { dino.dinoPositionX = 0 }
        else if (dino.dinoPositionX > 0) { dino.dinoPositionX -= 10 }
    }
    else if (event.key === "ArrowRight") {
        dino.element.classList.replace("dino-left", "dino")
        if (dino.dinoPositionX === 890) { dino.dinoPositionX = 890 }
        else if (dino.dinoPositionX < 890) { dino.dinoPositionX += 10 }
    }
    dino.element.style.left = `${dino.dinoPositionX}px`
}
document.addEventListener("keydown", moveDino)


let FrameCount = 0;

function GameLoop() {
    requestAnimationFrame(GameLoop);
    FrameCount++
    if (dino) {
        checkForWin()
    }
    moveEnemy()
    collision()
    if (FrameCount % 300 === 0) {
        addEnemy()
    }
}


let enemyArray = [];

function addEnemy() {
    console.log("ciao")
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    //const newEnemy= new Enemy (this.areaWidth, this.areaHeight, enemy)
    const newEnemy = new Enemy(940, 560, enemy)
    enemyArray.push(newEnemy)
    gameArea.appendChild(enemy)
}

function moveEnemy() {
    enemyArray.forEach((oneEnemy) => {
        if (oneEnemy.verticalPosition < (560 - oneEnemy.height)) {
            oneEnemy.verticalPosition++
            oneEnemy.enemyElement.style.top = `${oneEnemy.verticalPosition}px`;
        } else if (oneEnemy.verticalPosition === (560 - oneEnemy.height)) {
            oneEnemy.enemyElement.remove()
            let i = enemyArray.indexOf(oneEnemy)
            enemyArray.splice(i, 1)
        }
    })
}

function collision() {
    enemyArray.forEach((theEnemy) => {
        const dinoPosition = dino.element.getBoundingClientRect();
        const enemyPosition = theEnemy.enemyElement.getBoundingClientRect();
        if (dinoPosition.x < enemyPosition.x + enemyPosition.width &&
            dinoPosition.x + dinoPosition.width > enemyPosition.x &&
            dinoPosition.y < enemyPosition.y + enemyPosition.height &&
            dinoPosition.y + dinoPosition.height > enemyPosition.y
        ) {
            theEnemy.enemyElement.remove()
            dino.element.remove()
            if (dinosArray.length === 0) {
                gameOver()
            } else { newPlayer() }
        }
    })
}

function checkForWin() {
    const theEnd = document.querySelector(".finish")
    const dinoPositionW = dino.element.getBoundingClientRect();
    const finishPosition = theEnd.getBoundingClientRect();
    if (dinoPositionW.x < finishPosition.x + finishPosition.width &&
        dinoPositionW.x + dinoPositionW.width > finishPosition.x &&
        dinoPositionW.y < finishPosition.y + finishPosition.height &&
        dinoPositionW.y + dinoPositionW.height > finishPosition.y
    ) {
        finishArea.appendChild(dino.element)
        dino.element.style.top = `0px`;
        dino.element.style.left = `0px`;
        dino.element.style.height = `75px`;
        dino.element.style.width = `75px`;
        savedDinosArray.push(dino)
        if (dinosArray.length === 0) {
            gameOver()
        } else { newPlayer() }
    }
}

function gameOver() {
    const endOfGame = document.createElement("H1");
    gameArea.appendChild(endOfGame)
    endOfGame.innerText = `GAME OVER! You saved ${savedDinosArray.length} dinos from extinction`
    let GameOn = false
}
