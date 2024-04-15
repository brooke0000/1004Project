/*
TODO:
game won when player collides with artefact
add total game time in minutes or convert actual gameplay to minutes
make moving platforms move
make crumbling platforms crumble
fix player jump
fix collide with platforms when jumped on
spawn fire entities. make it so that they can only spawn on normal platforms
health
instantly kill player when they collide with a monster
////////////////////////////////hopefully finish up to here by the 24th////////////////////////////////
spawn goblins on normal platforms
add shooting
////////////////////////////////hopefully finish up to here by the 31st////////////////////////////////
fall damage
maybe add powerups
make help screen available
maybe make different floors
*/

//keeps track of how long the player has been playing in total
var gameTime = Date.now();
var minutes;

function gameplayTime(){
    var currentTime = Date.now();
    var actualTime = currentTime - gameTime;
    minutes = Math.floor(actualTime / 60000);

    console.log("minutes played: " + minutes);
}

gameplayTime();

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
    
    //checks the player entered a valid name
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
    document.getElementById("file").style.display = "none";
    document.getElementById("scoreComparison").style.display = "none";
    document.getElementById("previousResults").style.display = "none";
    document.getElementById("results").style.display = "none";

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

//platform array
var platformArray = [];

//player object
    var player = {
        avatar: document.getElementById("gameChar"),
        jump: false,
        jumpHeight: 0,
        x: 140, 
        y: 570,        
        name: username,
        currentHealth: health,
        level: level,
    };
    //makes the player spawn at the bottom left corner and facing towards the right
    function resetCharPos(){
        player.x = 140;
        player.y = 570; 
        document.getElementById("gameChar").style.transform = "scaleX(1)";
    }

function game(){ 
    resetCharPos();
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

    // artefact object
    var artefactOb = {
        x: 150,
        y: 150,
        visible: true,
        collected: false,
    };

    //randomise platform type
    function randomPlatformType() {
        var num;
        var type;
        //randomises platforms for hard/infinite modes
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
        //randomises platforms for medium mode
        else if (level == "medium") {
            num = Math.floor(Math.random() * 1);
            if (num === 0) {
                type = "moving";
            }
            else {
                type = "normal";
            }
        }
        //normal platform for easy mode
        else if (level == "easy") {
            type = "normal";
        }
        console.log("type: " + type);
        return type;
    }

    //platform object
    var platform = {
        x: 140, 
        y: 600, 
        type: "normal",
    };
    
    //monster object
    var monster = {
        x: 0, 
        y: 0, 
        health: 100,
        type: "fireEntity",
    };

    //should the goblin shoot?
    var distance = hypotenuse(player, monster);

    //health
    var maxHealth = 100;
    var health = maxHealth;

    if (player.currentHealth <= 0) {
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
        //player.jumpHeight += 15;
    }

    function playerMovement(){
        if(key.left){
            player.x -= 10;
           // console.log("player's x-axis: " + player.x);
            //if player goes to the game left border
            if (player.x < 140){
                player.x += 10;
            }
        }
        if(key.right){
            player.x += 10;
           // console.log("player's x-axis: " + player.x);
            //if player goes to the game right border
            if (player.x > 1310){
                player.x -= 10;
            }
        }
        if(key.jump){
            player.y -= 15;
            player.jump = false;
            setTimeout(jumping, 150);
           // console.log("player's y-axis: " + player.y);
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

    function createPlatform(){
        //create platform based on the platform object
        var spawnPlatform = Object.create(platform);

        //set the x-axis so that it is random but y-axis is fixed
        spawnPlatform.type = randomPlatformType();
        
        //id variables
        var platformID;
        var crumblingID;
        
        //platform ID increases based on the array length
        platformID = "platform" + platformArray.length;
        crumblingID = "crumbling" + platformArray.length;

        //make the platforms spawn closer together but not directly above
        //displays platform based on the randomised result in the x-axis
        if (spawnPlatform.type == "crumbling"){
            document.getElementById(crumblingID).style.display = "block";
            spawnPlatform.x = Math.floor(Math.random() * 1000) + 100;
        }
        else{
            document.getElementById(platformID).style.display = "block";
            spawnPlatform.x = Math.floor(Math.random() * 1000) + 100;
        }

        //spawns a platform every 60 in the y-axis
        if (platformArray.length > 0){
            spawnPlatform.y = platformArray[platformArray.length - 1].y - 60;
        }
        else{
            spawnPlatform.y = 600;
        }

        //spawn platform based on the randomised platform IDs
        document.getElementById(platformID).style.left = spawnPlatform.x + "px";
        document.getElementById(platformID).style.top = spawnPlatform.y + "px";

        document.getElementById(crumblingID).style.left = spawnPlatform.x + "px";
        document.getElementById(crumblingID).style.top = spawnPlatform.y + "px";

        //pushes into the platform array
        platformArray.push(spawnPlatform);

        //moving type code
        function moving(){
            
        }

        //crumbling type code
        function crumbling(){

        }

        console.log("platform's x-axis: " + spawnPlatform.x);
        console.log("platform's y-axis: " + spawnPlatform.y);
    }

    //spawns the platforms
    createPlatform();
    createPlatform();
    createPlatform();
    createPlatform();
    createPlatform();
    createPlatform();
    createPlatform();

    var onPlatform;

    //checks collisions
    function collision(){
        //iterates through each platform in the array for the collision functions
        for (var i = 0; i < platformArray.length; i++){
            var currentPlatform = platformArray[i];

            var leftPlatform = currentPlatform.x - 50;
            var rightPlatform = currentPlatform.x + 280;
            var topPlatform = currentPlatform.y;

            var midPoint = (rightPlatform + leftPlatform) / 2;

            var playerBottom = player.y + 75;
            var playerTop = player.y;

            //the area of the platform and under it
            while(player.x >= leftPlatform && player.x <= rightPlatform && playerBottom > topPlatform && playerTop < topPlatform){
                console.log("collision detected");
                console.log("topPlatform = " + topPlatform + " playerBottom = " + playerBottom);
                
                if(player.x >= leftPlatform && player.x <= midPoint){
                    player.x -= 10;
                }
                else if(player.x <= rightPlatform && player.x >= midPoint){
                    player.x += 10;
                }        
                player.y = topPlatform - 75;
            }  
            //the area surrounding the platform
            if(player.x >= leftPlatform && player.x <= rightPlatform && playerBottom <= topPlatform){
                console.log("player on platform");
                onPlatform = true;
                player.y -= 15;
                if (playerBottom <= topPlatform 
                    // && player.x < leftPlatform && player.x > rightPlatform
                    ){
                    console.log("player off platform");
                    player.y += 15;
                }
            }
        }
    }

    setInterval(collision, 1000 / 60);

    //if the final platform is landed on, reset the platforms and make the player start again from the bottom with randomised platforms
    //this repeats 3 times

    function artefactCollection(){        
        //if artefact collides with the player, levelComplete() is called
        document.getElementById("artefact").style.display = "block";
        document.getElementById("artefactPlatform").style.display = "block";

        var artefact = Object.create(artefactOb);

        //calculate distance between player and artefact
        var PAX = player.x - artefact.y;
        var PAY = player.y - artefact.y;
        var distance = Math.sqrt(PAX*PAX + PAY*PAY);

        if (distance < 20){
            artefactOb.collected = true;
            levelComplete();
        }
    }
    
    console.log("x-axis: " + artefact.x + " y-axis: " + artefact.y)
    artefactCollection();

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

//resets the platform positions
function resetPlatforms(){
    platformArray = [];

    for (var i = 0; i < platformArray.length; i++) {
        var platformID = "platform" + i;
        var crumblingID = "crumbling" + i;

        document.getElementById(platformID).style.display = "none";
        document.getElementById(crumblingID).style.display = "none";
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
    document.getElementById("artefactPlatform").style.display = "none";
    document.getElementById("healthLoss").style.display = "none";
    document.getElementById("health").style.display = "none";
    
    for (var i = 0; i < platformArray.length; i++) {
        var platformID = "platform" + i;
        var crumblingID = "crumbling" + i;
        document.getElementById(platformID).style.display = "none";
        document.getElementById(crumblingID).style.display = "none";
    }

    resetPlatforms();

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

    fileHandling();

    document.getElementById("scoreComparison").style.display = "block";
    document.getElementById("previousResults").style.display = "block";
    document.getElementById("results").style.display = "block";
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
    document.getElementById("artefact").style.display = "none";
    document.getElementById("artefactPlatform").style.display = "none";
    document.getElementById("healthLoss").style.display = "none";
    document.getElementById("health").style.display = "none";

    for (var i = 0; i < platformArray.length; i++) {
        var platformID = "platform" + i;
        var crumblingID = "crumbling" + i;
        document.getElementById(platformID).style.display = "none";
        document.getElementById(crumblingID).style.display = "none";
    }

    resetPlatforms();

    //add game over screen
    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("death").style.display = "block";
    document.getElementById("gameOverButton").style.display = "block";
    //back to level selection
}

//file handling
function fileHandling() {
    document.getElementById("file").style.display = "block";

    //players name, level, time, and score must be displayed
    var username = document.getElementById("username").value;

    var playerData = {
        "NAME":  username,
        "LEVEL": level,
        "TIME": seconds,
        "SCORE": score
    };
    //json format
    var json = JSON.stringify(playerData);

    var file = new Blob([json], {type:"application/json"});

    //download
    document.getElementById("file").href = URL.createObjectURL(file);

    document.getElementById("file").setAttribute("download", "playerData.json");
}

function scoreComparison() {
    //file input
    var input = document.getElementById("previousResults");

    //checks if file is selected
    if ('files' in input && input.files.length > 0) {
        var file = input.files[0];

        //file reader
        var reader = new FileReader();

        //read file contents
        reader.onload = function(event) {
            //content of the file
            var fileContent = event.target.result; 
            var playerData = JSON.parse(fileContent);

            //player data
            var output = document.getElementById("results");
            output.innerHTML = `<p>Name: ${playerData.NAME}</p>
                <p>Level: ${playerData.LEVEL}</p>
                <p>Time: ${playerData.TIME}</p>
                <p>Score: ${playerData.SCORE}</p>`;
        };
        //read file as text
        reader.readAsText(file);
    } else {
        alert('Please select a file.');
    }
}
