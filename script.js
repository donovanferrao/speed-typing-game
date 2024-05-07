const randomQuoteGenerator = "http://api.quotable.io/random";
const quoteElementDisplay = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const wordsCountElement = document.getElementById("wordsCount");

let intervalId;

startButton.addEventListener("click", () => {
  getNextQuote();
});

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteElementDisplay.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct && arrayValue.length === arrayQuote.length) {
    clearInterval(intervalId);
    displayWordsCount(arrayValue.length);
  }
});

function getRandomQuote() {
  return fetch(randomQuoteGenerator)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteElementDisplay.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteElementDisplay.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  clearInterval(intervalId);
  timerElement.innerText = 60;
  startTime = new Date();
  intervalId = setInterval(() => {
    const timeLeft = 60 - getTimerTime();
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      displayWordsCount(0);
    }
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function displayWordsCount(wordsCount) {
  wordsCountElement.innerText = `Letters Typed: ${wordsCount}`;
}

getNextQuote();

// const randomQuoteGenerator = "http://api.quotable.io/random";

// const getRandomQuote = async () => {
//   const response = await fetch(randomQuoteGenerator);
//   const data = await response.json();
//   return data.content;
// };

// const getNextQuote = async () => {
//   const quote = await getRandomQuote();
//   console.log(quote);
// };
// getNextQuote();
