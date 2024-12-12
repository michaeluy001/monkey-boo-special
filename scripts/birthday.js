/* Initialize SFX*/
const bgMusic = new Audio('./sounds/Jungle music.wav'); 
bgMusic.loop = true;
bgMusic.load();
const gameOverLose = new Audio('./sounds/gameover.mp3'); 
gameOverLose.load();
gameOverLose.loop= true;
const monkeySound = new Audio('./sounds/Monkey scream.wav');
monkeySound.load();
const hitSound = new Audio('./sounds/Fail guess.wav'); 
const youWonSound = new Audio('./sounds/clap.mp3');
youWonSound.load();
const hbdMusic = new Audio('./sounds/hbd music.mp3');
hbdMusic.load();
const playAgainButton = document.getElementById("try-again");
playAgainButton.addEventListener("click", playAgain);
/* Variable declarations */
const board = document.getElementById("status");
const score = document.getElementById("score");
let bananas = 0;
/* Initialize DOM */
let grid = document.querySelector(".grid");
let cells = document.querySelector(".grid").children;
/* Generate a random index for the monkey cell, give each cell an event listener */
function randNum(min, max) { return Math.floor(Math.random()*cells.length); } 
let monkeyCell = cells[randNum(0,cells.length)];
console.log(monkeyCell);
for (let i = 0; i < cells.length; i++) { cells[i].addEventListener("click", guess); }
/* function to check if the cell has been hit. If so, perform necessary actions */
let bananasToFind = cells.length-1;
let gameIsOver = false;
const surprise = document.getElementById("grid");
const clickedCellArray = [];
let phraseCounter = 0;


function guess(event) { 
        bgMusic.play(); /* starts Background music upon clicking on a cell */
        let clickedCell = event.target;
        const correctGuess = new Audio('./sounds/Fail guess.wav');
        correctGuess.currentTime = 0;
        correctGuess.load();
        const keyFrame = new KeyframeEffect(document.getElementById(monkeyCell.getAttribute("id")), 
           [
               {transform: "translateX(0px) translateY(0px)"},
               { transform: "translateX(0px) translateY(50px)"}
           ],
           {
           duration: 2000,
           direction: "alternate",
           easing: "ease-in-out",
           iterations: "Infinity",
           },
       );


            const animateImage = new Animation (keyFrame, document.timeline); 
        

        if (clickedCell === monkeyCell) {  /* It checks every hit if it's the monkey */
            monkeySound.play();
            document.getElementById(monkeyCell.getAttribute("id")).style.backgroundImage = "url('monkey.png')";
            board.innerText = "Game Over! Monkey-boo! wants you to";
            gameOver();   
            deactivateCell()
            gameOverLose.play();
            score.innerText = "Try again";
        } else { 
                bananas++;
                console.log(bananas);
                score.innerText = bananas;
                board.innerText = randomPhrase();
                correctGuess.play();
                deactivateCell();
                clickedCellArray.push(clickedCell);
                console.log("ClickedCellArray length: ", clickedCellArray.length);

            if (bananas == bananasToFind) {
                birthdayFunction();
                 gameOver();
                 deactivateCell();
                 
                   for(let i = 0; i < clickedCellArray.length; i++) {
                    console.log(document.getElementById(clickedCellArray[i].getAttribute("id")));
                    document.getElementById(clickedCellArray[i].getAttribute("id")).remove();
                   }
                   
                animateImage.play();
            }
            
            
             
    }
        function deactivateCell() {
            if(gameIsOver) {
                for (let i = 0; i < cells.length; i++) {
                    document.getElementById(cells[i].getAttribute("id")).style.border = "5px solid rgb(129, 163, 71)"; 
                    document.getElementById(cells[i].getAttribute("id")).style.backgroundColor = "rgb(206, 206, 183)";
                }
            } else {
                    document.getElementById(clickedCell.getAttribute("id")).style.backgroundImage = "url('banana.png')";
                    document.getElementById(clickedCell.getAttribute("id")).removeEventListener("click", guess);
            }
       }
       function birthdayFunction() {
             board.innerText = "Happy birthday";
             score.innerText = "Ma'am Jessah!";
             bgMusic.pause();
             youWonSound.play();
             hbdMusic.play();
             const birthdayTile = document.getElementsByClassName("grid")[0];
             const newTile = document.getElementById(monkeyCell.getAttribute("id"));
             birthdayTile.style.display = "flex";
             birthdayTile.style.flexDirection = "column";
             birthdayTile.style.justifyContent = "center";
             newTile.style.backgroundImage = "url('hbd pic.png')";
             newTile.style.border = "5px solid pink";
             newTile.style.backgroundColor = "red";
             newTile.style.width = "100%";
             newTile.style.height = "100%";
             newTile.style.backgroundSize = "60%";
             newTile.style.justifyItems ="center";
       }         
}   
/* This function shows random phrases. To eliminate repetition, previously used phrase will be removed */

function randomPhrase() {
    let phrases = new Array (
        "Boo-tastic! Let’s get swinging!",
        "Keep climbing, Banana Champ!",
        "Halfway there, Monkey Marvel!",
        "Boo-ya! You're unstoppable!",
        "Fantastic Four! Go, Go, Go!",
        "Triple Trouble! Almost there!",
        "Double the Fun! Keep swinging!",
        "Final swing for Monkey Boo glory!",
    );
    
    let randPhrase = phrases[phraseCounter];
    phraseCounter++;
    return randPhrase;

}
/* Finally, the gameOver function */
function gameOver() {
    gameIsOver = true;
    bgMusic.pause();
    removeAllListeners();
    let finalScore = bananas;
    
    playAgainButton.style.display = "block"; 
}
function removeAllListeners() { /* A function to remove all listeners, triggered when the game is over */
    for (let i = 0; i < cells.length; i++) { cells[i].removeEventListener("click", guess); }
}
function playAgain() {
    location.reload();
}





/* This is a project of mine so I can be familiar again with programming, 
test my logical power and imagination though writting codes. This is just a generic name that over time will 
get updated with more functions and features to make it as exciting and fun to play.

I do hope that along the way,
 I will be able to make the code as efficient and as precise as I could, 
 promoting flexibility and readabilty 

===================================================================================================================

Monkey Boo project all rights reserved 2024

Mechanics:

Reveal the monkey when there is only 1 cell left (meaning all fruits were gathered) - done
Add more Buttons and options like "Try again" and revise scoring system - done
Get as much fruit as you can by click-guessing on each of the cells - done
Different fruits will be added (different points)
Add more cells 
Different fruits will be added (different points)
difficulty progress (more monkeys will be added)


User Interface/Audio:
User interface should be improved - long term plan
more SFX
Get the BG music running - ys but with flaw
===================================================================================================================
PSEUDOCODE

Pseudocode Monkey Boo!

Everytime the player clicks, checks two conditions

1. if it hits the cell containing the monkey, then call gameOver function. Otherwise, register the click and store it in an incrementing variable.
   and then prevent the player from clicking on the cell.
2.If the player has enough bananas, call gameOver function


gameOver function:

If bananas were all gathered, do action 1
Otherwise, do action 2

Finally,
 displays the final score; disable clicks on all cells; the "Play again Button"(reset the browser)


Action 1: play winning audio, reveal monkey 1
Action 2: play losing audio, reveal monkey 2

===================================================================================================================

 UPDATES WRITTEN HERE 




















*/










