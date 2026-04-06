/*
1. Get human and computer choice
2. Check winner
    - if === then return tie
    - if values are rock and scissor, get player with choice of rock
    - if values are rock and paper, get player with choice of paper
    - if values are scissor and paper, get player with choice of scissor
    - add score to winner
3. Show scores
*/

const choices = ["rock", "paper", "scissor"];
let humanScore = 0;
let computerScore = 0;
let ties = 0;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function getHumanChoice() {
  const input = prompt(
    "Pick your move! [ ROCK | PAPER | SCISSOR ]",
  ).toLowerCase();
  return choices.includes(input) ? input : getHumanChoice();
  // returns input if its within choices else recurse
}

function playRound(humanChoice, computerChoice) {
  const playerChoices = { human: humanChoice, computer: computerChoice };
  if (humanChoice === computerChoice) {
    console.log("Tie!");
    ties++;
  } else if (checkWinner(playerChoices) === "human") {
    console.log("Human won!");
    humanScore++;
  } else {
    console.log("Computer won!");
    computerScore++;
  }

  showScore();
}

function checkWinner(playerChoices) {
  const values = Object.values(playerChoices);
    if (values.includes("rock") && values.includes("scissor"))
      return Object.keys(playerChoices).find(
        (key) => playerChoices[key] === "rock",
      );
    else if (values.includes("rock") && values.includes("paper"))
      return Object.keys(playerChoices).find(
        (key) => playerChoices[key] === "paper",
      );
    else if (values.includes("scissor") && values.includes("paper"))
      return Object.keys(playerChoices).find(
        (key) => playerChoices[key] === "scissor",
      );
}

function showScore() {
  console.log(
    `Human: ${humanScore} | Computer: ${computerScore} | Tie: ${ties}`,
  );
}

function playGame() {
  // for (let i = 0; i < 5; i++) {
  //   const computerChoice = getComputerChoice();
  //   const humanChoice = getHumanChoice();
  //   console.log(`Computer: ${computerChoice}`);
  //   console.log(`You: ${humanChoice}`);

  //   playRound(humanChoice, computerChoice);
  // }
}

playGame();