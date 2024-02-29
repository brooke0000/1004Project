//objects
var player = {x: 0, y: 0};
var platform = {x: 0, y: 0};
var monster = {x: 0, y: 0};

//collisions
var pCollision = contains(player, platform);
var mCollision = contains(player, monster);

//should the goblin shoot?
var distance = hypotenuse(player, monster);

//health
var maxHealth = 100;
var health = maxHealth;

//game
// function startGameButton() {
//     console.log("Game started")
//     getUsername();
// }

function getUsername() {
    var correct = false;
    var username = document.getElementById("username").value;
    
    if (username == ""){
        alert("Please enter a username");
        console.log("Name empty");
        document.getElementById("username");
        document.getElementById("startButton");
    }
    else{
        correct = confirm("Is this correct?");    

        if (!correct) {
            alert("Retype your name");
            console.log("name isn't right");
            username = "";
        } 
        
        else {
            alert("Start");
            console.log("name is correct");
        }

    }
//move to line below "console.log("name is correct");" when the username function is working
    console.log("Username:", username);
    document.getElementById("nameInput").style.display = "none";
    document.getElementById("startButton").style.display = "none";

    gameIntro();
}

function gameIntro(){
    console.log("game introduction started");

    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("introBG").style.display = "block";
   // document.getElementById("char1").style.display = "block";
   // document.getElementById("char2").style.display = "block";
    document.getElementById("speechBlock").style.display = "block";

    conversation();
    levelSelect();
}
// conversation in html
// onclick code
function conversation(){
    
}

function levelSelect(){
    document.getElementById("introBG").style.display = "none";
    document.getElementById("speechBlock").style.display = "none";
    //document.getElementById("char1").style.display = "none";
    //document.getElementById("char2").style.display = "none";

    document.getElementById("gameCanvas").style.display = "block";

    console.log("level selection started");

    document.getElementById("easyButton").style.display = "block";
    document.getElementById("mediumButton").style.display = "block";
    document.getElementById("hardButton").style.display = "block";
    document.getElementById("infiniteButton").style.display = "block";

    var level;
}

function easy(){
    level = "easy";
    console.log(level, "mode selected");

    game();
}

function medium(){
    level = "medium";
    console.log(level, "mode selected");

    game();
}

function hard(){
    level = "hard";
    console.log(level, "mode selected");

    game();
}

function infinite(){
    level = "infinite";
    console.log(level, "mode selected");

    game();
}

function game(){
    console.log("Game started")

    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("easyButton").style.display = "none";
    document.getElementById("mediumButton").style.display = "none";
    document.getElementById("hardButton").style.display = "none";
    document.getElementById("infiniteButton").style.display = "none";

    document.getElementById("gameBG").style.display = "block";
    document.getElementById("gameChar").style.display = "block";
}

function contains(boundaries, object){
    return (object.x + object.width >= boundaries.x &&
        object.x <= boundaries.x + boundaries.width &&
        object.y + object.height >= boundaries.y &&
        object.y <= boundaries.y + boundaries.height
       );
}

function hypotenuse(player, monster){
    xDistance = player.x - monster.x;
    yDistance = player.y - monster.y;

    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

//to flip an image : transform: scaleX(-1);