/* global variables */
var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;
var gameOverText;
/* sets the values of all the main elements in the game, also starts the game. */
function startGame() {
    document.getElementById("playAgain").style.visibility = "hidden"; 
    myGamePiece = new component(150, 85, "media/beeGuy.png", 30, 150, "image");
    myBackground = new component(1200, 900, "media/grassBackground.jpg", 0, 0, "background")
    myScore = new component("30px", "Serif", "yellow", 15, 35, "text");
    gameOverText = new component("100px", "BeeGuy", "Tan", 250, 370, "text");
    myGameArea.start();
}

/* sets the size of the canvas and controls how the game object is moved - arrow keys. */
var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
      
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        
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
            myScore.text = "SCORE: " + myGameArea.frameNo;
            myScore.update();
            gameOverText.text = "GAME OVER";
            gameOverText.update();
            document.getElementById("playAgain").style.visibility = "visible"; 
            return;
        }
    }
/*  Controls the game speed and sets a max and min distance between top and bottom obstacles.*/
    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();

    myGameArea.frameNo += 1;
    if(myGameArea.frameNo == 1 || everyInterval(110)){
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 500;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) +minHeight);
        minGap = 150;
        maxGap = 500;
        gap = Math.floor(Math.random()*(maxGap - minGap +1) +minGap);
        myObstacles.push(new component(40, height, "brown", x, 0));
        myObstacles.push(new component(40, x - height - gap, "tan", x, height + gap));
    }
    for(i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += -5;
        myObstacles[i].update();
    }

    
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();

    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
    if(myGameArea.keys && myGameArea.keys[37]){myGamePiece.speedX = -5;} 
    if(myGameArea.keys && myGameArea.keys[39]){myGamePiece.speedX = 5;} 
    if(myGameArea.keys && myGameArea.keys[38]){myGamePiece.speedY = -5;} 
    if(myGameArea.keys && myGameArea.keys[40]){myGamePiece.speedY = 5;} 
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyInterval(n){
    if((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
}