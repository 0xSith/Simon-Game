// Global variable and array declaration
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;


//Start Game
if (level === 0){
$(document).on("keydown", function(){nextSequence();});
}

// Function to select a random NEXT color and level tracking

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors [randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/"+randomChosenColor + ".mp3");
  audio.play();

  if(level > 0){
    $(document).off("keydown");

  }
}

//User event listened click function as well as actions and sounds when clicked

$(".btn").click(function(event){
  var userChosenColor = event.target.id;

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})


function playSound (name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed")}, 100);
}



// Check user's answer against the correct answer
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){nextSequence();},1000);
    }
  }
  else{
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){$("body").removeClass("game-over");},100);
    level = 0;
    gamePattern = [];
  }
  if (level === 0){
  $(document).on("keydown", function(){nextSequence();});
  }
}
