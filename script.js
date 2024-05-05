const randomQuoteGenerator = "http://api.quotable.io/random";
const quoteElementDisplay = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");

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
  if (correct) getNextQuote();
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
