// Global variable and array declaration
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;


//Start Game

$(document).keypress(function() {
  if (started===false){
    nextSequence();
    started = true;
  }
});

// Function to select a random NEXT color and level tracking

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors [randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound (randomChosenColor);
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
    playSound("wrong");
    setTimeout(function(){$("body").removeClass("game-over");},100);
      restartGame();
  }
}

//Restart Game and clear levels and Game pattern

function restartGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
