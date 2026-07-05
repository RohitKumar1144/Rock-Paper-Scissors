let compChoice= 0;
let compPlayed ='';
let result ='';
let userPlay ='';
let score = JSON.parse(localStorage.getItem('score')) || {
  won: 0,
  lose: 0,
  tie: 0
};
updateScore();

function bodyResult(result , choiceUser , choiceComp){
  document.querySelector('.js-result').innerHTML = `${result}`;
  document.querySelector('.js-play').innerHTML = `You <img src="images/${choiceUser}-emoji.png" class="move-icon"> <img src="images/${choiceComp}-emoji.png" class="move-icon"> Computer`;
}

function compPlay(){
  compChoice = Math.random();
  if(compChoice<=0.33){
  return 'Rock';
  } 
  else if(compChoice<=0.66){
  return 'Scissors';
  } 
  else{
  return 'Paper';
  }
}

function playGame(playerChoice){
  compChoice = compPlay();
  if(playerChoice === "Rock"){
    if(compChoice === "Rock"){
    result = "Tie.";
    } 
    else if(compChoice === "Scissors"){
    result = "You win.";
    } 
    else{
    result = "You lose.";
    }
  } 
  else if(playerChoice === "Scissors"){
    if(compChoice === "Rock"){
    result = "You lose.";
    } 
    else if(compChoice === "Scissors"){
    result = "Tie.";
    } 
    else{
    result = "You win.";
    }
  }
  else if(playerChoice === "Paper"){
    if(compChoice === "Rock"){
    result = "You win.";
    } 
    else if(compChoice === "Scissors"){
    result = "You lose.";
    } 
    else{
    result = "Tie.";
    }
  }
  if(result === "You win.") score.won++;
  else if(result === "You lose.") score.lose++;
  else if(result === "Tie.") score.tie++;
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
  bodyResult(result, playerChoice, compChoice);
}
function updateScore(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.won}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

function autoPlayGame(){
  playerChoice = compPlay();
  compChoice = compPlay();
  playGame(playerChoice, compChoice);
  bodyResult(result , playerChoice , compChoice);
}
let isAutoPlaying = false;
let intervalId;
let autoplayButton = document.querySelector('.js-autoplay-button');
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(autoPlayGame, 1000);
    isAutoPlaying = true;
    autoplayButton.innerHTML = 'Stop Playing';
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoplayButton.innerHTML = 'Auto Play';
  }
}

autoplayButton.addEventListener('click', () => {
  autoPlay();
});
document.body.addEventListener('keydown', (event) =>{
  if(event.key === 'a'){
    autoPlay();
  }
  else if(event.key === 'Backspace'){
    confirmReset();
  }
});

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
      confirmReset();
});

function confirmReset(){
  let resetPara = document.querySelector('.js-confirm-reset-para');
  resetPara.innerHTML = `
  <div class="confirm-div">
    <div> Are you sure you want to reset the score? </div>
    <button class="yes-button js-yes-button"> Yes </button>
    <button class="no-button js-no-button"> No </button>
  </div>
  `;
  document.querySelector('.js-yes-button').addEventListener('click', () => {
      score.won =0;
      score.lose =0;
      score.tie =0;
      localStorage.removeItem('score');
      updateScore();
      resetPara.innerHTML = '';
  });
  document.querySelector('.js-no-button').addEventListener('click', () => {
      resetPara.innerHTML = '';
  });
}

document.querySelector('.js-rock-button').addEventListener('click', () =>{
        playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () =>{
      playGame('Paper');
});

  document.querySelector('.js-scissors-button').addEventListener('click', () =>{
      playGame('Scissors');
});
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's') {
    playGame('Scissors');
  }
});
