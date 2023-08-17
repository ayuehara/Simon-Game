var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started =0;

$(document).keydown(function(){
    nextSequence();
    started =1;
})

function nextSequence (){
    userClickedPattern = [];

    $("h1").html ('<h1 id="level-title">Level '+level+'</h1>')
    level++;

    var randomNumber = Math.floor (Math.random()* 4);
    var randomChosenColour = buttonColours [randomNumber];

    gamePattern.push (randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound (randomChosenColour);
    animatePress (randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = [];

    userChosenColour.push (this.id);
    userClickedPattern.push (this.id);

    playSound (userChosenColour);
    animatePress (userChosenColour);
    checkAnswer (this.id);
})

function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");

    setTimeout (function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel){
    if (currentLevel==gamePattern){
        setTimeout (function(){
            nextSequence ();
        }, 1000);

    } else {
        $("h1").html ('<h1 id="level-title">Game Over, Press Any Key to Restart</h1>')
        var wrong = new Audio ("sounds/wrong.mp3");
        wrong.play ();
        $('body').addClass("game-over");
        setTimeout (function(){
            $('body').removeClass("game-over");
        }, 200);
    }
}

function startOver (){
    level = 0;
    gamePattern = [];
    started = 0;
}