function createNewCard() {
  let cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
  <div class="card-down"> </div>
  <div class="card-up"> </div>
`;

  return cardElement;
}
createNewCardTest();

function appendNewCard(parentElement) {
  let cardElement = createNewCard();
  cardElement = parentElement.appendChild(cardElement);
  return cardElement;
}
appendNewCardTest();

function shuffleCardImageClasses() {
  let cardClasses = [
    "image-1",
    "image-1",
    "image-2",
    "image-2",
    "image-3",
    "image-3",
    "image-4",
    "image-4",
    "image-5",
    "image-5",
    "image-6",
    "image-6",
  ];

  let shuffledCards = _.shuffle(cardClasses);

  return shuffledCards;
}
// shuffleCardImageClassesTest()

function createCards(parentElement, shuffledImageClasses) {
  let cards = [];

  for (let i = 0; i < 12; i++) {
    let card = appendNewCard(parentElement);
    card.classList.add(shuffledImageClasses[i]);

    let cardObject = {
      index: i,
      element: card,
      imageClass: shuffledImageClasses[i],
    };
    cards.push(cardObject);
  }
  return cards;
}
createCardsTest();

function doCardsMatch(cardObject1, cardObject2) {
  if (cardObject1.imageClass == cardObject2.imageClass) {
    return true;
  } else {
    return false;
  }
}
doCardsMatchTest();

let counters = {};

function incrementCounter(counterName, parentElement) {
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }

  counters[counterName]++;

  parentElement.innerHTML = counters[counterName];
}
incrementCounterTest();

let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flips", document.getElementById("flip-count"));

  /* If 'lastCardFlipped' is null (this is the first card flipped), update 'lastCardFlipped' and return (nothing else to do) */
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if (!doCardsMatch(newlyFlippedCard, lastCardFlipped)) {
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }

  incrementCounter("matches", document.getElementById("match-count"));

  if (counters["matches"] == 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }

  /* Resetting 'lastCardFlipped' to null */
  lastCardFlipped = null;
}

function resetGame() {
  let cardsContainer = document.getElementById("card-container");

  while (cardsContainer.firstChild != null) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }

  document.getElementById("flip-count").innerHTML = 0;
  document.getElementById("match-count").innerHTML = 0;

  counters["flips"] = null;
  counters["matches"] = null;

  lastCardFlipped = null;

  setUpGame();
}

setUpGame();
