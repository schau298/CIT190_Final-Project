
/* global variables */
var myGamePiece;
var myBackground;
var myObstacles = [];
var gameOverText;

/* Starts the Game Timer */
var timerVar = setInterval(gameTimer, 1000);
var totalSeconds = 0;
function gameTimer() {
           ++totalSeconds;
           var hour = Math.floor(totalSeconds /3600);
           var minute = Math.floor((totalSeconds - hour*3600)/60);
           var seconds = totalSeconds - (hour*3600 + minute*60);
           if(hour < 10)
             hour = "0"+hour;
           if(minute < 10)
             minute = "0"+minute;
           if(seconds < 10)
             seconds = "0"+seconds;
           document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
        }
/* sets the values of all the main elements in the game, also starts the game. */
function startGame() {

    document.getElementById("playAgain").style.visibility = "hidden"; 
    myGamePiece = new component(150, 85, "media/glorpo.png", 30, 150, "image");
    myBackground = new component(1500, 800, "media/space.jpeg", 0, 0, "background")
    gameOverText = new component("100px", "AlienBoy", "Cyan", 250, 400, "text");
    myGameArea.start();
}

/* sets the size of the game and controls how the game object is moved - arrow keys. */
var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 1500;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
      
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 15);

        
        window.addEventListener('keydown', function(e){
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.keys[e.keyCode] = false;
        })

        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop : function() {
        clearInterval(this.interval);
    }
}
/* updates the game and controls movement */

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
            if(type == "background"){
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;     

        if(this.type == "background"){
            if(this.x == -(this.width)){
                this.x = 0;
            }
        }   
    }
    this.hitBy = function(otherobj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);
        var hit = true;
        if((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)){
            
            hit = false;
        }
        return hit;
    }
}
/* Resets the game once the player hits an object, prompts user for play again. */
function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(i = 0; i < myObstacles.length; i += 1){
        if(myGamePiece.hitBy(myObstacles[i])){
            myGameArea.stop();
            myGameArea.clear();
            myBackground.update();
            gameOverText.text = "GAME OVER";
            gameOverText.update();
            clearInterval(timerVar);
            document.getElementById("playAgain").style.visibility = "visible"; 
            return;
        }
    }
/*  Controls the game speed and sets a max and min distance between top and bottom obstacles.*/
    myGameArea.clear();
    myBackground.speedX = -5;
    myBackground.newPos();
    myBackground.update();

    myGameArea.frameNo += 1;
    if(myGameArea.frameNo == 1 || everyInterval(110)){
        x = myGameArea.canvas.width;
        minHeight = 50;
        maxHeight = 500;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) +minHeight);
        minGap = 150;
        maxGap = 250;
        gap = Math.floor(Math.random()*(maxGap - minGap +1) +minGap);
        myObstacles.push(new component(100, height, "media/rocket.png", x, 0, "image"));
		    myObstacles.push(new component(100, x-height-gap, "media/rocketdown.png", x, height+gap, "image"));

      
    }
    for(i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += -5;
        myObstacles[i].update();
    }

    
   

    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
    if(myGameArea.keys && myGameArea.keys[37]){myGamePiece.speedX = -8;} 
    if(myGameArea.keys && myGameArea.keys[39]){myGamePiece.speedX = 8;} 
    if(myGameArea.keys && myGameArea.keys[38]){myGamePiece.speedY = -8;} 
    if(myGameArea.keys && myGameArea.keys[40]){myGamePiece.speedY = 8;} 
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyInterval(n){
    if((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
}