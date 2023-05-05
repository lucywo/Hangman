const words = [
  "flower",
  "style",
  "sun",
  "computer",
  "light",
  "lucy",
  "world",
  "friends",
  "clock",
  "tv"
];

let word = "";
let wordState = [];
let fails = 0;
let lettersClicked = [];

const wordContainer = document.getElementById("word-container");
const keyboardContainer = document.getElementById("keyboard-container");
const failsContainer = document.getElementById("fails");
const newGameButton = document.getElementById("new-game-button");

function pickRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function setupGame() {
  word = pickRandomWord();
  wordState = Array(word.length).fill("-");
  fails = 0;
  lettersClicked = [];

  renderWord();
  renderKeyboard();
  updateFails();
}

function renderWord() {
  wordContainer.textContent = wordState.join(" ");
}

function renderKeyboard() {
  keyboardContainer.innerHTML = "";
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleLetterClick(letter));
    if (lettersClicked.includes(letter)) {
      button.disabled = true;
    }
    keyboardContainer.appendChild(button);
  }
}

function handleLetterClick(letter) {
  lettersClicked.push(letter);
  const letterIndex = word.indexOf(letter);
  if (letterIndex === -1) {
    fails++;
    updateFails();
    checkGameOver();
  } else {
    updateWordState(letterIndex, letter);
    renderWord();
    checkGameWon();
  }
  renderKeyboard();
}

function updateWordState(index, letter) {
  wordState[index] = letter;
}

function updateFails() {
  failsContainer.textContent = `FAILS: ${fails}/10`;
}

function checkGameOver() {
  if (fails >= 10) {
    alert("Game over!");
    setupGame();
  }
}

function checkGameWon() {
  if (!wordState.includes("-")) {
    alert("You won!");
    setupGame();
  }
}

newGameButton.addEventListener("click", setupGame);

setupGame();

