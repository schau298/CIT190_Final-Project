/* Sets Timer and displays restart button*/

 var timeleft = 20;
 var downloadTimer = setInterval(function(){
 timeleft--;
 document.getElementById("countdowntimer").textContent = timeleft;
 document.getElementById("restart").style.visibility = "hidden"; 
 if(timeleft <= 0)
    endScreen = "GAME OVER!";
    document.getElementById("result").innerHTML = endScreen;
     clearInterval(downloadTimer);
     document.getElementById("restart").style.visibility = "visible"; 
 },1000);


/* Displays random animal to look for */

var random = Math.floor(Math.random() * $('.clickme').length);
$('.clickme').hide().eq(random).show();


 /* Score */
 
var guess=0;
function addGuess(amount) {
    guess= guess + amount;
    document.getElementById("guess").innerHTML = guess;
}

/* Play Again */
var restart = $('#restart');



restart.click(function () {
    location.reload();
});

/* Display's Text when each animal is found */

function displayTxt1() {
  
  var chicken=document.getElementById("chicken");
   
  if(onclick=chicken){
        animal="You found the Chicken!"
    }
document.getElementById("result").innerHTML = animal;
}


function displayTxt2() {
var cow=document.getElementById("cow");

if (onclick=cow){
    animal="You found the Cow!"
}
document.getElementById("result").innerHTML = animal;
}


function displayTxt3() {
    var horse=document.getElementById("horse");
    
    if (onclick=horse){
        animal="You found the Horse!"
    }
    document.getElementById("result").innerHTML = animal;
    }


    function displayTxt4() {
        var pig =document.getElementById("pig");
        
        if (onclick=pig){
            animal="You found the Pig!"
        }
        document.getElementById("result").innerHTML = animal;
        }

        function displayTxt5() {
            var goat=document.getElementById("goat");
            
            if (onclick=cow){
                animal="You found the Goat!"
            }
            document.getElementById("result").innerHTML = animal;
            }
    
            function displayTxt6() {
                var lamb=document.getElementById("lamb");
                
                if (onclick=lamb){
                    animal="You found the Lamb!"
                }
                document.getElementById("result").innerHTML = animal;
                }

            

