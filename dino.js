
class Dino {
    constructor() {
        this.dinoPositionX = 0
        this.element = document.querySelector(".dino")
    }
}

let dino = new Dino

class Enemy {
    constructor(areaWidth, areaHeight, element) {
        this.enemyElement = element;
        this.areaWidth = areaWidth;
        this.areaHeight = areaHeight;
        this.width = 30;
        this.height = 30;
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
        if (dino.dinoPositionX === 0) { dino.dinoPositionX = 0 }
        else if (dino.dinoPositionX > 0) { dino.dinoPositionX -= 10 }
    }
    else if (event.key === "ArrowRight") {
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
    moveEnemy()
    collision()
    if (FrameCount % 300 === 0) {
        addEnemy()
    }
}

const gameArea = document.querySelector("#game-area")

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
            let i= enemyArray.indexOf(oneEnemy)
            enemyArray.splice(i,1)
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
        }
    })
}


    GameLoop()