
class Dino {
    constructor() {
        this.dinoPositionX = 0
        this.element = document.querySelector(".dino")
    }
}

let dino = new Dino

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





//let enemyPositionY= 0;
let FrameCount = 0;
function GameLoop() {
    requestAnimationFrame(GameLoop);
    FrameCount++
    //moveEnemy()
    if (FrameCount % 300 === 0) {
        addEnemy()
    }
}

const gameArea= document.querySelector("#game-area")

function addEnemy() {
    console.log("ciao")
    const enemy = document.createElement("div")
    gameArea.appendChild(enemy)
    enemy.classList.add("enemy");
}

//function moveEnemy() {
  //  enemyPositionY++
    //enemy.style.top=`${enemyPositionY}px`
//}

GameLoop()