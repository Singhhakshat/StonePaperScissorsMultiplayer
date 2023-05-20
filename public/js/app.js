// const element={
//     horizontalRule: document.getElementsByClassName('horizontalRule'),
//     gameTitle: document.getElementById("title"),
//     gameContainer: document.getElementById("gameContainer"),
//     startButton: document.getElementById("startGame"),
//     round: document.getElementById("round"),
//     playerSelect: document.getElementById("playerSelect"), 
//     rockImage: document.getElementById("rockImage"),
//     paperImage: document.getElementById("paperImage"),
//     scissorsImage: document.getElementById("scissorsImage"),
//     nextRoundButton: document.getElementById("nextRound"),
//     showCurrent: document.getElementById("showCurrent"),
//     playerChoice: document.getElementById("playerChoice"),
//     computerChoice: document.getElementById("computerChoice"),
//     result:document.getElementById("result"),
//     gameScore: document.getElementById("gameScore"),
//     playerScore: document.getElementById("playerScore"),
//     computerScore: document.getElementById("computerScore"),
//     endGame: document.getElementById("endGame"),
//     finalScorePlayer: document.getElementById("finalScorePlayer"),
//     finalScoreComputer: document.getElementById("finalScoreComputer"),
//     finalScoreTies: document.getElementById("finalScoreTies"),
//     finalText:document.getElementById("finalText"),
//     finalImage: document.getElementById("finalImage"),
// };

//1 means rock, 2 means paper, 3 means scissors and 4 means tie

const gameStats={
    computerSelection: 0,
    playerSelection: 0,
    enable: false,
    round: 1,
    playerScore: 0,
    computerScore: 0,
    ties:0,
    nextButton: false,
}

function computerSelection(){
    gameStats.computerSelection= Math.floor(Math.random() * 3) + 1;
}

function updateRound(){
    element.playerScore.innerHTML=`You- ${gameStats.playerScore}`;
    element.computerScore.innerHTML=`Computer- ${gameStats.computerScore}`;
}

function startAnimation(){
    document.getElementById("gameContainer").classList.add('StartGameAnimation');
    document.getElementById("gameContainer").style.height="100vh";
    document.getElementById("gameContainer").style.width="100vw";

    document.getElementById("startGame").style.display="none";   
    document.getElementById("title").style.display="none";

    document.getElementById("round").style.display="block";
    document.getElementById("playerSelect").style.display="block";
    document.getElementById("nextRound").style.display="block";
    document.getElementById("gameScore").style.display="flex";
    element.horizontalRule[0].style.display="block";
    element.horizontalRule[1].style.display="block";
}

function startGame(){
    startAnimation();
    updateRound();
    nextButton(false);
    element.round.innerHTML=`Round ${gameStats.round}`;
    gameStats.enable=true;
}