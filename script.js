/*
1. Get human and computer choice
2. Check winner
    - if === then return tie
    - if values are rock and scissor, get player with choice of rock
    - if values are rock and paper, get player with choice of paper
    - if values are scissor and paper, get player with choice of scissor
    - add score to winner
3. Show scores
4. If a player reaches 5 points:
    - disable buttons
    - enable reset button
    - display the winner
*/

const choices = ["rock", "paper", "scissor"];
let humanScore = 0;
let computerScore = 0;
let ties = 0;
let humanChoice, computerChoice;

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
  const roundWinner = checkRoundWinner(playerChoices);
  if (humanChoice === computerChoice) {
    console.log("Tie!");
    ties++;
  } else if (roundWinner === "human") {
    console.log("Human won!");
    humanScore++;
  } else {
    console.log("Computer won!");
    computerScore++;
  }
  const gameWinner = checkGameWinner();
  if (gameWinner) {
    toggleChoiceButtons();
  }

  showScore(gameWinner);
}

function checkRoundWinner(playerChoices) {
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

function checkGameWinner() {
  if (humanScore === 5) return "human";
  if (computerScore === 5) return "computer";
  return;
}

function showScore(gameWinner) {
  console.log(
    `Human: ${humanScore} | Computer: ${computerScore} | Tie: ${ties}`,
  );
  const gameWinnerDisplay = document.querySelector(".result");
  if (gameWinner) gameWinnerDisplay.textContent = "The Winner is " + gameWinner;
  else gameWinnerDisplay.textContent = "";

  const playerChoiceDiv = document.querySelector(".player-choice");
  const computerChoiceDiv = document.querySelector(".computer-choice");
  playerChoiceDiv.textContent = "";
  computerChoiceDiv.textContent = "";
  playerChoiceDiv.textContent = "You: " + humanChoice;
  computerChoiceDiv.textContent = "Computer: " + computerChoice;

  const humanScoreDisplay = document.querySelector(".player-score");
  const computerScoreDisplay = document.querySelector(".computer-score");
  const tieScoreDisplay = document.querySelector(".tie-score");
  humanScoreDisplay.textContent = "Your Score: " + humanScore;
  computerScoreDisplay.textContent = "Computer Score: " + computerScore;
  tieScoreDisplay.textContent = "Ties: " + ties;
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  ties = 0;

  toggleChoiceButtons();
  showScore();
}

function toggleChoiceButtons() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.disabled = !button.disabled;
  });
}

function playGame() {
  computerChoice = getComputerChoice();
  console.log(`Computer: ${computerChoice}`);
  console.log(`You: ${humanChoice}`);
  playRound(humanChoice, computerChoice);
}

// Select player choice when button is clicked
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    humanChoice = button.id.toString();
    //alert(humanChoice);
    playGame();
  });
});

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
  resetGame();
});
