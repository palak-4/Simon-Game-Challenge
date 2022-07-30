var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level=0;

//use to detect key press on keyboard.
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//use to detect click.
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Use to check if user has made correct pattern or not.
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
  }

 else{
   console.log("wrong");
   playSound("wrong");

  //Adding gameover class if pattern is wrong.
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").text("Game Over, Press Any Key To Restart");

  startOver();
 }
}

//defines the sequence of game.
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//to generate sound effects.
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//to add animations.
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

//Restart the game.
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
