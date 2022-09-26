const startBtn = document.querySelector('.start');
const buttons = document.querySelectorAll('.button')
const results = document.querySelector('.results');
const userScoreCount = document.querySelector('.playerScore');
const compScoreCount = document.querySelector('.compScore')
const compChoice = document.querySelector('.compChoice');
const winner = document.querySelector('.winner');
const resultBoard = document.querySelector('.result-board')
const finalResult = document.querySelector('.final-result');
const clickAudio = document.querySelector('#click');
const startAudio = document.querySelector('#start');
const winAudio = document.querySelector('#win');
const loseAudio = document.querySelector('#lose');
const onOffBtn = document.querySelector('.sound-icon');

let playAgainBtn;
let playerScore = 0;
let computerScore = 0;
let choices = ["rock","paper", "scissors"];
let playerSelection;
let computerSelection;
let audioStatus = 'on';

onOffBtn.addEventListener('click', setAudio);

function setAudio() {
    if (audioStatus == 'on') {
        audioStatus = 'off';
        onOffBtn.src = 'images/off.svg';
    } else if (audioStatus == 'off') {
        audioStatus = 'on';
        onOffBtn.src = 'images/on.svg';
    }
}

function start() {
    if (audioStatus !== 'off') startAudio.play();
    document.querySelector('.instructions').style.display = "none";
    document.querySelector(".start").style.display = "none";
    document.querySelector('.main').classList.add('fade-in-anim');
    document.querySelector('.main').style.visibility = 'visible';
}

for (const button of buttons) {
  button.addEventListener('click', () => {
    playerSelection = button.id;
    clickAudio.currentTime = 0;
    if (audioStatus !== 'off') clickAudio.play();
    playRound();
  });
}

function playRound() {
    let computerSelection = choices[Math.floor(Math.random() * choices.length)];
    // resultBoard.classList.add('fade-in-anim');
    resultBoard.style.visibility = 'visible';


    if ( playerSelection == "rock" && computerSelection == "paper" ) {
        computerScore++;
        compChoice.textContent = `COMPUTER PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "Paper beats Rock. 1 point for the computer.";
        results.style.color = 'red';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        compScoreCount.classList.add("text-transform");
        results.classList.add("text-transform");
        
    } else if ( playerSelection == "paper" && computerSelection == "rock") {
        playerScore++;
        compChoice.textContent = `COMPUTER PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "Paper beats Rock. 1 point for you!"
        results.style.color = '#03A062';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        userScoreCount.classList.add("text-transform");
        results.classList.add("text-transform");

    } else if ( playerSelection == "scissors" && computerSelection ==  "rock") {
        computerScore++;
        compChoice.textContent = `COMPUTER PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "Rock beats Scissors. 1 point for the computer"
        results.style.color = 'red';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        compScoreCount.classList.add("text-transform");
        results.classList.add("text-transform");

    } else if ( playerSelection == "scissors" && computerSelection ==  "paper") {
        playerScore++;
        compChoice.textContent = `COMPUTER PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "Scissors beat Paper. 1 point for you!"
        results.style.color = '#03A062';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        userScoreCount.classList.add("text-transform");
        results.classList.add("text-transform");

    } else if ( playerSelection == "rock" && computerSelection ==  "scissors") {
        playerScore++;
        compChoice.textContent = `COMPUTER PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "Rock beats Scissors. 1 point for you!";
        results.style.color = '#03A062';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        userScoreCount.classList.add("text-transform");
        results.classList.add("text-transform");

    } else if ( playerSelection == "paper" && computerSelection == "scissors") {
        computerScore++;
        compChoice.textContent = `COMPUTER PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "Scissors beat Paper. 1 point for the computer"
        results.style.color = 'red';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        compScoreCount.classList.add("text-transform");
        results.classList.add("text-transform");

    } else if ( playerSelection == computerSelection ) {
        compChoice.textContent = `COMPUTER ALSO PICKED: ${computerSelection.toUpperCase()}`;
        results.textContent = "It's a tie!"
        results.style.color = '#03A062';
        userScoreCount.textContent = `${playerScore}`;
        compScoreCount.textContent = `${computerScore}`;
        results.classList.add("text-transform");

    }
    checkWinner();
}

function checkWinner() {
    if (playerScore == 5 || computerScore == 5) {
    for (const button of buttons) {
        button.disabled = true;
        button.classList.remove('hover-on');
    }

    finalResult.style.visibility = 'visible';
    finalResult.classList.add('fade-in-anim');
    playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "PLAY AGAIN";
    finalResult.appendChild(playAgainBtn);
    playAgainBtn.addEventListener("click", playAgain);

    }   if (playerScore == 5) {
        if (audioStatus !== 'off') winAudio.play();
        winner.textContent = "YOU SCORED 5 POINTS! YOU ARE THE WINNER!";
        winner.style.color = '#03A062';
        } else if (computerScore == 5) {
        if (audioStatus !== 'off') loseAudio.play();
        winner.textContent = 'THE COMPUTER BEAT YOU...BETTER LUCK NEXT TIME.';
        winner.style.color = 'red';
        }
}

[userScoreCount, compScoreCount, results].forEach((element)=>{
    element.addEventListener('animationend', ()=>{
      element.classList.remove("text-transform");
   });
});

function playAgain() {
    if (audioStatus !== 'off') startAudio.play();
    for (const button of buttons) {
        button.classList.add('hover-on');
        button.disabled = false;
    }
    resultBoard.style.visibility = 'hidden';
    finalResult.style.visibility = 'hidden';
    playAgainBtn.parentNode.removeChild(playAgainBtn);
    playerScore = 0;
    computerScore = 0;
    userScoreCount.textContent = "0";
    compScoreCount.textContent = "0"
    winner.textContent = "";
}

startBtn.addEventListener('click', start);