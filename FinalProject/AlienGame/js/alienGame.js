<section style="background-color:lightsteelblue;opacity:.8;padding-top:5px;padding-bottom:10px;height:100px;">
<p style="text-align:center;">

<button id="left">Left</button>
<button id="right">Right</button>
</p>
</section>
<script>
var id;
var posX=0;
var posY=0;
var elem = document.getElementById("alien"); 
document.getElementById("left").addEventListener("click",function() {
  posY=elem.y;
  posX=elem.x; 
  var id = setInterval(frame, 5);
  function frame() {
    document.getElementById("stop").addEventListener("click",function(){clearInterval(id);});
    if (posX <= 50) {
      clearInterval(id);
    } else {
      posX--;
      elem.style.left = posX + 'px'; 
      document.getElementById("xCoord").value=elem.x;
      document.getElementById("yCoord").value=elem.y;
    }
  }
});
document.getElementById("right").addEventListener("click",function() {
  posY=elem.y;
  posX=elem.x; 
  var id = setInterval(frame, 5);
  function frame() {
    document.getElementById("stop").addEventListener("click",function(){clearInterval(id);});
    if (posX >= 750) {
      clearInterval(id);
    } else {
      posX++;
      elem.style.left = posX + 'px'; 
      document.getElementById("xCoord").value=elem.x;
      document.getElementById("yCoord").value=elem.y;
    }
  }
});



</script>