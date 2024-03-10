/*
TODO:
fix player jump
collide with platforms when jumped on
file handling
////////////////////////////////hopefully finish up to here by the end of this week////////////////////////////////
spawn multiple randomised platforms
make moving platforms move
game won when player collides with artefact
fix players position when they respawn
spawn fire entities. make it so that they can only spawn on normal platforms
health
instantly kill player when they collide with a monster
fall damage
////////////////////////////////hopefully finish up to here by the 17th////////////////////////////////
make crumbling platforms crumble
spawn goblins on normal platforms
add shooting
////////////////////////////////hopefully finish up to here by the 21st////////////////////////////////
maybe add powerups
make help screen available
maybe make different floors
*/

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
    document.getElementById("healthLoss").style.display = "block";
    document.getElementById("health").style.display = "block";

    //player object
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

    //platform objects
    var platform = {
        x: 140, 
        y: 600, 
        type: "normal",
    };
    var platform2 = Object.create(platform);
    var platform3 = Object.create(platform);
    var platform4 = Object.create(platform);
    var platform5 = Object.create(platform);
    
    //monster objects
    var monster = {
        x: 0, 
        y: 0, 
        type: "fireEntity",
    };

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
        player.y += 15;
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
            player.y -= 15;
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

    //checks collisions
function collision(){
    var leftPlatform = platform.x - 50;
    var rightPlatform = platform.x + 130;
    var topPlatform = platform.y;

    var playerBottom = player.y - 60;
        
    /*
    the area the player can't come into contact with is player.x >= leftPlatform, player.x <= rightPlatform, and player.y <= topPlatform
    but the player must be able to come into contact with player.x <= leftPlatform and player.x >= rightPlatform if player.y >= topPlatform
    
    when the player is on the ground, playerBottom = 510 and when the player jumps, playerBottom = 465. topPlatform = 600
    player.y y-axis is 510
    */
   console.log("playerBottom = " + playerBottom + " topPlatform = " + topPlatform);
   //the area of the platform and under it
    if(player.x >= leftPlatform && player.x <= rightPlatform && playerBottom <= topPlatform){
        console.log("collision detected");
        if(player.x >= leftPlatform){
            player.x -= 10;
        }
        else if(player.x <= rightPlatform){
            player.x += 10;
        }        
    }    
    //the area surrounding the platform
    else if(player.x <= leftPlatform && player.x >= rightPlatform && playerBottom >= topPlatform){
        player.y -= 15;
        if (playerBottom <= topPlatform){
            player.y += 15;
        }
    }
}

setInterval(collision, 1000 / 60);

    //if the final platform is landed on, reset the platforms and make the player start again from the bottom with randomised platforms
    //this repeats 3 times
    //if artefact collides with the player, levelComplete() is called
    document.getElementById("artefact").style.display = "block";
    // levelComplete();


    // function collision(player, platform) {
    //     //player edges
    //     var playerLeft = player.x;
    //     var playerRight = player.x + player.avatar.width;
    //     var playerTop = player.y;
    //     var playerBottom = player.y + player.avatar.height;

    //     //platform edges
    //     var platformLeft = platform.x;
    //     var platformRight = platform.x + document.getElementById("platform").width;
    //     var platformTop = platform.y;
    //     var platformBottom = platform.y + document.getElementById("platform").height;

    //     //collision check
    //     if (playerRight >= platformLeft && playerLeft <= platformRight && playerBottom >= platformTop && playerTop <= platformBottom) {
    //         console.log("collision detected");
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }

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