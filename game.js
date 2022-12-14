var level = 0;
isGameOn = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function animateButtonByKeypress(colour) {
  $(`#${colour}`).animate({ opacity: 0.2 });
  setTimeout(function() {
    $(`#${colour}`).animate({ opacity: 1 })
  }, 100);
}

function animateButtonByClick(colour) {
  $(`#${colour}`).addClass("pressed");
  setTimeout(function() {
    $(`#${colour}`).removeClass("pressed")
  }, 100);
}

function animateBody() {
  $("body").addClass("game-over");
  setTimeout(function () {
  $("body").removeClass("game-over");
  }, 200);
}
function playSound(colour) {
  (new Audio(`sounds/${colour}.mp3`)).play();
}

function getRandomColour() {
  var randomNumber = Math.floor(Math.random() * 4);
  return buttonColours[randomNumber];
}

function playSequence(colour) {
  animateButtonByKeypress(colour);
  playSound(colour);
}
function displayGameLevel () {
  level++;
  $("#level-title").text("Level " + level);
}

function nextSequence() {
  isGameOn = true;
  displayGameLevel();
  userClickedPattern = [];
  var randomChosenColour = getRandomColour();
  playSequence(randomChosenColour);
  gamePattern.push(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
      animateBody();
      playSound("wrong");
      startOver();
      $("#level-title").text("Game over, Press here to Restart");
      isGameOn = false;
    }
}

$("#level-title").click(function(event) {
  if (event.type === "click" && !isGameOn) {
    nextSequence();
  }
});

$(".container").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animateButtonByClick(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
