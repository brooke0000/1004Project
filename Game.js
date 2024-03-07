//TODO:
//make it so platforms can spawn in random x coordinates
//fix player jump
//spawn moving platforms
//spawn fire entities. make it so that they can only spawn on normal platforms
//spawn crumbling platforms
//spawn goblins
//add shooting
//maybe add powerups
//maybe make different floors

//page changes functions
function removeHomePage() {
    document.getElementById("nameInput").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameHelp").style.display = "none";
    document.getElementById("gameCanvas").style.display = "none";
}
function addIntro(){
    document.getElementById("introBG").style.display = "block";
    document.getElementById("char1").style.display = "block";
    document.getElementById("char2").style.display = "block";
    document.getElementById("speechBlock").style.display = "block";
    document.getElementById("speech1").style.display = "block";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//game images screen
function placeHolder(){
    alert("not implemented yet :(");
    return;
}
function images2(){
    removeHomePage();
    document.getElementById("gameHelp2").style.display = "none";
    document.getElementById("death").style.display = "none";
    document.getElementById("gameOverButton").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("easyButton").style.display = "none";
    document.getElementById("mediumButton").style.display = "none";
    document.getElementById("hardButton").style.display = "none";
    document.getElementById("infiniteButton").style.display = "none";

    //display the images of the characters, monsters, platforms, and power-ups
    //make it so text appears over the image explaining what it is and what it does
}
//function to take the player to the screen they should be on
function homeScreen(){
    images2();
    getUsername();
}

function levelScreen(){
    images2();
    levelSelect();
}

//username
function getUsername() {
    document.getElementById("nameInput").style.display = "block";
    document.getElementById("startButton").style.display = "block";
    document.getElementById("gameHelp").style.display = "block";

    var correct = false;
    var username = document.getElementById("username").value;
    
    //checks the player entered a vallid name
    //non-letters
    for (let i = 0; i < username.length; i++) {
        let characters = username.charCodeAt(i);

        if( !(characters >= 65 && characters <= 90) && !(characters >= 97 && characters <= 122) ) {
            alert("Please enter a name without a space, number, or special character");
            console.log("Name invalid");
            return;
        }
    }

    //null entry
    if (username == ""){
        alert("Please enter a username");
        console.log("Name empty");
        return;
    }
    //confirmation
    else{
        correct = confirm("Is this correct?");    

        if (!correct) {
            alert("Retype your name");
            console.log("name isn't right");
            return;
        } 
        
        else {
            alert("Start");
            console.log("name is correct");
        }

    }

    //moves onto the introduction
    console.log("Username:", username);
    removeHomePage();

    gameIntro();
}

function gameIntro(){
    console.log("game introduction started");

    addIntro();
}

// conversation in html
var speech1 = document.getElementById("speech1");
var speech2 = document.getElementById("speech2");
var speech3 = document.getElementById("speech3");
function conversation(){
    if(speech1.style.display ==="block"){
        speech1.style.display = "none";
        speech2.style.display = "block";
    }
    else if(speech2.style.display === "block"){
        speech2.style.display = "none";
        speech3.style.display = "block";
    }
    else if(speech3.style.display === "block"){
        speech3.style.display = "none";
        levelSelect();
    }
}

//level selection variables
var level;
//checks if hard mode is completed
var complete = false;

function levelSelect(){
    document.getElementById("introBG").style.display = "none";
    document.getElementById("speechBlock").style.display = "none";
    document.getElementById("char1").style.display = "none";
    document.getElementById("char2").style.display = "none";
    document.getElementById("gameOverButton").style.display = "none";
    document.getElementById("death").style.display = "none";
    document.getElementById("speechBlock").style.display = "none";
    document.getElementById("score").style.display = "none";

    document.getElementById("gameCanvas").style.display = "block";

    console.log("level selection started");

    //level selection display
    document.getElementById("easyButton").style.display = "block";
    document.getElementById("mediumButton").style.display = "block";
    document.getElementById("hardButton").style.display = "block";
    document.getElementById("infiniteButton").style.display = "block";
    document.getElementById("gameHelp2").style.display = "block";
}

//levels
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
    //checks if hard mode has been completed
    if (!complete)
    {
        alert("Hard mode has not yet been completed");
        console.log("hard mode incomplete");
        return;
    }
    level = "infinite";
    console.log(level, "mode selected");

    game();
}

var seconds;
function time(startTime){
    seconds = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timeElapsed").innerText = "Time: " + seconds + " seconds";
}

var score = 0;
var floor = 1;
var interval;

function game(){ 
    console.log("Game started")   
    //time
    document.getElementById("timeElapsed").style.display = "block";

    var startTime = Date.now();
    time(startTime);
    interval = setInterval(function () {time(startTime);}, 1000);

    //setup
    document.getElementById("gameCanvas").style.display = "none";
    document.getElementById("easyButton").style.display = "none";
    document.getElementById("mediumButton").style.display = "none";
    document.getElementById("hardButton").style.display = "none";
    document.getElementById("infiniteButton").style.display = "none";

    document.getElementById("gameBG").style.display = "block";
    document.getElementById("gameChar").style.display = "block";

    //objects
    var player = {
        avatar: document.getElementById("gameChar"),
        jump: false,
        x: 140, 
        y: 570,        
        name: username,
        currentHealth: health,
        level: level,
    };

    //randomise platform type
    function randomPlatformType() {
        var num;
        var type;
        if (level == "hard" || level == "infinite") {
            num = Math.floor(Math.random() * 2);
            if (num === 0) {
                type = "crumbling";
            }
            else if (num === 1) {
                type = "moving";
            }
            else {
                type = "normal";
            }
        }
        else if (level == "medium") {
            num = Math.floor(Math.random() * 1);
            if (num === 0) {
                type = "moving";
            }
            else {
                type = "normal";
            }
        }
        else if (level == "easy") {
            type = "normal";
        }
        console.log("type: " + type);
        return type;
    }

    var platform = {
        x: 140, 
        y: 600, 
        type: "normal",
    };
    
    var monster = {x: 0, y: 0, type: "",};

    //should the goblin shoot?
    var distance = hypotenuse(player, monster);

    //health
    var maxHealth = 100;
    var health = maxHealth;

    if (health == 0) {
        player.x = 140;
        player.y = 570;
        gameOver();
    }
        
    //game functions
    var key = {
        left: false,
        right: false,
        jump: false,
    };

    var flipped = false;

    function jumping() {
        player.y += 10;
    }

    function playerMovement(){
        if(key.left){
            player.x -= 10;
            console.log("player's x-axis: " + player.x);
            //if player goes to the game left border
            if (player.x < 140){
                player.x += 10;
            }
        }
        if(key.right){
            player.x += 10;
            console.log("player's x-axis: " + player.x);
            //if player goes to the game right border
            if (player.x > 1310){
                player.x -= 10;
            }
        }
        if(key.jump){
            player.y -= 10;
            player.jump = false;
            setTimeout(jumping, 150);
            console.log("player's y-axis: " + player.y);
        }
        player.avatar.style.left = player.x + "px";
        player.avatar.style.top = player.y + "px";        
    }

    window.onkeydown = function(e){
        //a key
        if (e.keyCode === 65) {
            key.left = true;
            console.log("a key pressed");
            if (flipped == false){
                document.getElementById("gameChar").style.transform = "scaleX(-1)";
            }
            flipped = true;
            }
        //d key
        if (e.keyCode === 68) {
            key.right = true;
            console.log("d key pressed");
            if(flipped == true){
                document.getElementById("gameChar").style.transform = "scaleX(1)";
            }
            flipped = false;
            }
        //w key
        if (e.keyCode === 87) {
            key.jump = true;
            console.log("w key pressed");
        }
    };

    window.onkeyup = function(e){
        if (e.keyCode === 65) {
            key.left = false;
        }
        else if (e.keyCode === 68) {
            key.right = false;
        }
        else if (e.keyCode === 87) {
            key.jump = false;
        }
    };

    setInterval(playerMovement, 1000 / 20);

    //set the x-axis so that it is random but y-axis is fixed
    //every -100 y up to -500
    
    //0x - 1160x

    platform.type = randomPlatformType();
    
    if (platform.type == "crumbling"){
        document.getElementById("crumbling").style.display = "block";
        platform.x = Math.floor(Math.random() * 1181) + 180;
        platform.y = 600;
    }
    else{
        document.getElementById("platform").style.display = "block";
        platform.x = Math.floor(Math.random() * 1061) + 150;
        platform.y = 600;
    }

    document.getElementById("platform").style.left = platform.x + "px";
    document.getElementById("platform").style.top = platform.y + "px";

    document.getElementById("crumbling").style.left = platform.x + "px";
    document.getElementById("crumbling").style.top = platform.y + "px";

    console.log("platform's x-axis: " + platform.x);
    console.log("platform's y-axis: " + platform.y);
    //if the final platform is landed on, reset the platforms and make the player start again from the bottom with randomised platforms
    //this repeats 3 times
    //if artefact collides with the player, levelComplete() is called
    document.getElementById("artefact").style.display = "block";
    collision(artefact, player.avatar);
    // player.x = 140;
    // player.y = 570;
    // levelComplete();

    //checks collisions
    // function contains(boundaries, object){
    //     return (object.x + object.width >= boundaries.x &&
    //         object.x <= boundaries.x + boundaries.width &&
    //         object.y + object.height >= boundaries.y &&
    //         object.y <= boundaries.y + boundaries.height
    //     );
    // }
    function collision(object1, object2) {
        if (object1.x == object2.x && object1.y == object2.y){
            console.log("collision");
        }
    }

    //checks which level is selected to include certain monsters/platforms or not
    if (level == "easy" || level == "medium" || level == "hard" || level == "infinite"){
        console.log("spawn normal platforms");
    }
    if (level == "medium" || level == "hard" || level == "infinite"){
        console.log("spawn fireEntities and moving platforms");
    }
    if (level == "hard" || level == "infinite"){
        console.log("spawn goblins and crumbling platforms");
    }
    if (level == "infinite"){
        console.log("see how high the player can get");
    }

    //distance between monster and player
    function hypotenuse(player, monster){
        xDistance = player.x - monster.x;
        yDistance = player.y - monster.y;

        return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    }
}

function levelComplete(){
    clearInterval(interval);

    console.log(level, "mode completed");
    if (level == "hard"){
        complete = true;
    }
    //display scores

    //remove game assets
    document.getElementById("gameBG").style.display = "none";
    document.getElementById("gameChar").style.display = "none";
    document.getElementById("timeElapsed").style.display = "none";
    document.getElementById("artefact").style.display = "none";
    document.getElementById("platform").style.display = "none";
    document.getElementById("crumbling").style.display = "none";

    //add cutscreen assets
    document.getElementById("introBG").style.display = "block";
    document.getElementById("char1").style.display = "block";
    document.getElementById("char2").style.display = "block";
    document.getElementById("speechBlock2").style.display = "block";
    document.getElementById("speech4").style.display = "block";
}

function endSpeech() {
    document.getElementById("speech4").style.display = "none";
    document.getElementById("speechBlock2").style.display = "none";
    //display score
    scoreDisplay();
}

var multiplier;

function scoreDisplay() {
    console.log("display score");
    var maxTime = 500;
    if (level == "easy")
    {
        multiplier = 1;
    }
    else if (level == "medium"){
        multiplier = 2.5;
    }
    else if (level == "hard" || level == "infinite"){
        multiplier = 5;
    }
    console.log("multiplier: " + multiplier);

    maxTime = maxTime - seconds;
    console.log("seconds: " + seconds);
    console.log("points: " + maxTime);
    //500 is the completion score
    score = Math.round(maxTime * multiplier) + 500;
    if (maxTime <= 0){
        score = 500;
    }

    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("introBG").style.display = "none";
    document.getElementById("char1").style.display = "none";
    document.getElementById("char2").style.display = "none";
    document.getElementById("gameOverButton").style.display = "block";
    document.getElementById("score").style.display = "block";  
    document.getElementById("score").innerText = "TIME ELAPSED: " + seconds + "\nLEVEL MULTIPLIER: "+ multiplier +"\nTOTAL SCORE: " + score;  
    //back to level selection
}

function gameOver(){
    clearInterval(interval);

    console.log("Player died");
    //remove game assets
    document.getElementById("gameBG").style.display = "none";
    document.getElementById("gameChar").style.display = "none";
    document.getElementById("timeElapsed").style.display = "none";
    document.getElementById("platform").style.display = "none";
    document.getElementById("crumbling").style.display = "none";
    document.getElementById("artefact").style.display = "none";

    //add game over screen
    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("death").style.display = "block";
    document.getElementById("gameOverButton").style.display = "block";
    //back to level selection
}

//file handling
//players name, level, time, and score must be displayed
var file = new Blob(["NAME: " + username + "\nLEVEL: " + level + "\nTIME: " + seconds + "\nSCORE: " + score], {type:"text/plain"});
var read = new FileReader();