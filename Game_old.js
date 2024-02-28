

const gameInstance = new Game();

//Player functions
function getUsername() {
    const username = prompt("Enter name");
    const context = gameInstance.context;
    const gameCanvas = document.getElementById("gameCanvas");

    nameCheck();
    function nameCheck() {
        print("Is this correct?");
        var correct = false;

        yesButton();
        noButton();

        if (correct == true) {
            print("Let's start");
        }
        else {
            print("Retype your name");
        }
    }

    function yesButton() {
        correct = true;
        print("Let's start");
    }

    function noButton() {
        correct = false;
        print("Retype your name");
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            yesButton.style.display = "inline-block";
            noButton.style.display = "inline-block";
        }
    });

    }    
    function startGame() {
        gameInstance.gameStart = true;
        gameInstance.gameLoop();
    }
}

function startGameButton(event) {
    event.preventDefault();
    getUsername();
}
    
function player(username, score, level) {
    this.name = username;
    this.score = score;
    this.level = level;
}

player.prototype.jump = function () {

};

player.prototype.move = function () {

};

player.prototype.collectPowerUp = function () {

};

player.prototype.defeatMonster = function () {

};

//Platform
function platform(isStationary, isMoving, isCrumbling) {
    this.isStationary = isStationary;
    this.isMoving = isMoving;
    this.isCrumbling = isCrumbling;
}

//Monsters
function monster(fireEntity, goblin) {
    this.fireEntity = fireEntity;
    this.goblin = goblin;
}

monster.prototype.attack = function () {

};

monster.prototype.spawn = function () {

};

//collectibles
function powerUps(type, effect) {

}

//level select
function level() {
    easy();
    medium();
    hard();
    infinity();
}

//level types
function easy() {
    platform.call(this.isStationary);
    powerUps.call(this, "powerUp", "bow");
    powerUps.call(this, "powerUp", "dJump");
    powerUps.call(this, "powerUp", "bird");
    artifact.call(this);
}

function medium() {
    easy();
    platform.call(this.isCrumbling);
    monster.call(this.fireEntity);
}

function hard() {
    medium();
    platform.call(this.isMoving);
    monster.call(this.goblin);
}

function infinity() {
    hard();
}

//artifact

function artifact() {

}
//game functions
function introduction() {

}

function gamePlay() {

}
