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

function playGame(playerChoice, compChoice){
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
}
function updateScore(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.won}, Losses: ${score.lose}, Ties: ${score.tie}`;
}