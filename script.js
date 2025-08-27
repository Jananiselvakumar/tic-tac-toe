const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "🐱";
let running = true;

function startGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  resetBtn.addEventListener("click", resetGame);
}

function cellClicked(){
  const index = this.getAttribute("data-index");
  if(options[index] !== "" || !running) return;

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
}

function changePlayer(){
  currentPlayer = (currentPlayer === "🐱") ? "🐰" : "🐱";
  statusText.textContent = `Player ${currentPlayer}'s turn!`;
}

function checkWinner(){
  let roundWon = false;
  let winningPattern = [];

  for(let i=0; i<winPatterns.length; i++){
    const [a,b,c] = winPatterns[i];
    if(options[a] && options[a] === options[b] && options[a] === options[c]){
      roundWon = true;
      winningPattern = [a,b,c];
      break;
    }
  }

  if(roundWon){
    statusText.textContent = `✨💖 Player ${currentPlayer} Wins! 💖✨`;
    statusText.classList.add("rainbow-text");
    highlightWin(winningPattern);
    launchConfetti();
    running = false;
  }
  else if(!options.includes("")){
    statusText.textContent = "🤝 It's a Draw!";
    running = false;
  }
  else{
    changePlayer();
  }
}

function highlightWin(pattern){
  pattern.forEach(index => {
    const cell = cells[index];
    cell.classList.add("win");

    const colors = ["red","orange","yellow","green","blue","purple"];
    for(let i=0; i<6; i++){
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      const colorClass = colors[Math.floor(Math.random()*colors.length)];
      sparkle.classList.add(colorClass);
      sparkle.textContent = "✨";
      sparkle.style.left = Math.random() * 60 + "px";
      sparkle.style.top = Math.random() * 60 + "px";
      cell.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  });
}

function launchConfetti(){
  const container = document.getElementById("confetti-container");
  const colors = ["#ff4d4d","#ff944d","#ffeb3b","#66cc66","#4da6ff","#b366ff"];

  for(let i=0; i<80; i++){
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.width = confetti.style.height = (Math.random()*8+4) + "px";
    confetti.style.animationDuration = (Math.random()*2 + 2) + "s";
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

function resetGame(){
  currentPlayer = "🐱";
  options = ["","","","","","","","",""];
  statusText.textContent = `Player ${currentPlayer} goes first!`;
  statusText.classList.remove("rainbow-text");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken", "win");
    cell.innerHTML = ""; // remove sparkles
  });
  running = true;
}

startGame();
