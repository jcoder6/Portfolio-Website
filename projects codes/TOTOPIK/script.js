const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const userScore = document.querySelector(".user-score");
const compScore = document.querySelector(".comp-score");
const userImgBet = document.querySelector(".user-img-bet");
const compImgBet = document.querySelector(".comp-img-bet");
const alertMessage = document.querySelector(".alert-message");
const resetBtn = document.querySelector(".reset-btn");

rock.addEventListener('click', rockClicked);
paper.addEventListener('click', paperClicked);
scissor.addEventListener('click', scissorClicked);
resetBtn.addEventListener('click', resetClicked);
var userBet = "";
var compBet = "";
var choices = ["rock", "scissor", "paper"];

// console.log(userImgBet);
function rockClicked() {
  userBet = "rock";
  compBet = choices[Math.floor(Math.random() * choices.length)];
  checkWhoWon(userBet, compBet);
}

function scissorClicked() {
  userBet = "scissor";
  compBet = choices[Math.floor(Math.random() * choices.length)];
  checkWhoWon(userBet, compBet);
}

function paperClicked() {
  userBet = "paper";
  compBet = choices[Math.floor(Math.random() * choices.length)];
  checkWhoWon(userBet, compBet);
}

let uscore = 0;
let cscore = 0;

function resetClicked() {
  uscore = 0;
  cscore = 0;
  displayAlert("GAME RESET", "tie");
  compScore.innerHTML = cscore;
  userScore.innerHTML = uscore;
}

function checkWhoWon(user, comp){
  // console.log(user, comp);
  if(user == "rock"){
    if(comp == "scissor"){
      uscore++;
      displayAlert("WINS IN", "wins");
    } else if(comp == "paper"){
      cscore++
      displayAlert("LOSES IN", "lose");
    } else {
      displayAlert("IT'S A TIE", "tie");
    }
  }

  if(user == "paper"){
    if(comp == "rock"){
      uscore++;
      displayAlert("WINS IN", "wins");
    } else if(comp == "scissor"){
      cscore++;
      displayAlert("LOSES IN", "lose");
    } else {
      displayAlert("IT'S A TIE", "tie");
    }
  }

  if(user == "scissor"){
    if(comp == "paper"){
      console.log("user win");
      uscore++;
      displayAlert("WINS IN", "wins");
    } else if(comp == "rock"){
      cscore++;
      displayAlert("LOSES IN", "lose");
    } else {
      displayAlert("IT'S A TIE", "tie");
    }
  }

  userImgBet.textContent = user;
  compImgBet.textContent = comp;
  setTimeout(function () {
    userImgBet.textContent = "";
    compImgBet.textContent = "";
  },1000);  
  compScore.innerHTML = cscore;
  userScore.innerHTML = uscore;
}

function displayAlert(sign, result) {
  alertMessage.textContent = sign;
  alertMessage.classList.add(result);

  setTimeout(function() {
    alertMessage.classList.remove(result);
    alertMessage.textContent = "";
  },1000)
}