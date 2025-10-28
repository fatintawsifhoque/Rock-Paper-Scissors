(function () {
  // DOM Elements
  const playerScoreElm = document.getElementById("player-score");
  const computerScoreElm = document.getElementById("computer-score");
  const resultElm = document.getElementById("result");
  const rockBtn = document.getElementById("rock");
  const paperBtn = document.getElementById("paper");
  const scissorsBtn = document.getElementById("scissors");
  const resetBtn = document.getElementById("reset");

  // Game state
  let playerScore = 0;
  let computerScore = 0;
  const winningScore = 5;

  // Choices
  const choices = ["rock", "paper", "scissors"];

  // Get computer choice
  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  // Determine winner of a round
  function getRoundResult(player, computer) {
    if (player === computer) return "draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "player";
    }
    return "computer";
  }

  // Update visual feedback
  function updateVisualFeedback(playerChoice, computerChoice, result) {
    // Reset all
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      btn.classList.remove("winner", "loser", "draw");
    });

    // Highlight player choice
    const playerBtn = document.querySelector(`[data-choice="${playerChoice}"]`);
    const computerBtn = document.querySelector(`[data-choice="${computerChoice}"]`);

    if (result === "draw") {
      playerBtn.classList.add("draw");
    } else if (result === "player") {
      playerBtn.classList.add("winner");
      computerBtn.classList.add("loser");
    } else {
      playerBtn.classList.add("loser");
      computerBtn.classList.add("winner");
    }
  }

  // Check if game is over
  function checkGameOver() {
    if (playerScore >= winningScore || computerScore >= winningScore) {
      [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
        btn.disabled = true;
      });
      resultElm.textContent = playerScore >= winningScore
        ? "🎉 You won the game!"
        : "💻 Computer won the game!";
    }
  }

  // Handle player choice
  function handlePlayerChoice(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = getRoundResult(playerChoice, computerChoice);

    // Update scores
    if (result === "player") {
      playerScore++;
      playerScoreElm.textContent = playerScore;
      resultElm.textContent = "You won this turn!";
    } else if (result === "computer") {
      computerScore++;
      computerScoreElm.textContent = computerScore;
      resultElm.textContent = "Computer won this turn!";
    } else {
      resultElm.textContent = "Draw this turn!";
    }

    // Visual feedback
    updateVisualFeedback(playerChoice, computerChoice, result);

    // Check game over
    checkGameOver();
  }

  // Event listeners for choices
  rockBtn.addEventListener("click", () => handlePlayerChoice("rock"));
  paperBtn.addEventListener("click", () => handlePlayerChoice("paper"));
  scissorsBtn.addEventListener("click", () => handlePlayerChoice("scissors"));

  // Reset game
  resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreElm.textContent = "0";
    computerScoreElm.textContent = "0";
    resultElm.textContent = "";

    // Clear visual feedback
    [rockBtn, paperBtn, scissorsBtn].forEach(btn => {
      btn.classList.remove("winner", "loser", "draw");
      btn.disabled = false;
    });
  });
})();