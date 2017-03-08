$(document).ready(function(){
"use strict";

var simonSequence = [];
var counter = 0;
var roundCounter = 2;

//====================================================
//      Animation for Squares to Light up
//====================================================
function animateClick(element){
    $(element).removeClass("down");
    $(element).addClass("up");

    setTimeout(function(){
        $(element).removeClass("up");
        $(element).addClass("down");
    }, 300);
}

//====================================================
//      How to Start game
//====================================================
function startGame(){
    simonSequence = [];
    counter = 0;
    roundCounter = 2;
    simonMove();
    $("#roundFailed").html("");
}

//====================================================
//      How to Start Game with button
//====================================================
$("#start").click(function(){
    $("#round").html("Round: 1");
    startGame();
});

//====================================================
//      Click function to Start animation & Round
//====================================================
$(".square").click(function(click){
    animateClick($(this));

    if ($(this).attr("data") == simonSequence[counter]){
        if (counter == (simonSequence.length -1)){
            $("#round").html("Round: " + roundCounter++);
            counter = 0;
            simonMove();
        } else {
            counter++;
        }
    } else {
        gameOver();
    }   
});

//====================================================
//      How to generate random box colors
//====================================================   
function getRandomColor(){
    var colors = ["red", "yellow", "green", "blue"];
    var randomNumber = Math.floor(Math.random()* 4);
    return (colors[randomNumber]);
}

//====================================================
//      Simon's Move to Adding to Array
//====================================================
function simonMove(){
    var square = getRandomColor();
    simonSequence.push(square);
    playSimonSequence(simonSequence);
}

//====================================================
//      How to generate Simon's Sequence
//====================================================   
function playSimonSequence(simonSequence){
    var i = 0;
    var intervalId = setInterval(function(){
        switch (simonSequence[i]) {
            case "red": 
                animateClick($(".red"));
                break;
            case "yellow": 
                animateClick($(".yellow"));
                break;
            case "green": 
                animateClick($(".green"));
                break;
            case "blue": 
                animateClick($(".blue"));
                break;                                      
        }
        if (i < simonSequence.length){
            i++;
        } else {
            clearInterval(intervalId);
        }
    }, 500);
}
//====================================================
//      Game Over Function
//====================================================
function gameOver(){
    simonSequence = [];
    counter = 0;
    roundCounter=2;
    $("#roundFailed").html("Round: " + "Failed");
}

});
