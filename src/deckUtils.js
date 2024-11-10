export const updateZIndex = (cards) => {
  const cardElements = document.querySelectorAll(".card");
  cardElements.forEach((card, index) => {
    card.style.zIndex = cards.length - index;
  });
};

export const focusFirstCard = () => {
  const nextCard = document.querySelectorAll(".card");
  if (nextCard[0]) {
    nextCard[0].focus();
  }
};

export const handleLeftClick = (cards, setCards) => {
  const cardElements = document.querySelectorAll(".card");
  if (cardElements[0]) {
    cardElements[0].classList.remove("flipped");
    cardElements[0].classList.add("move-left");
    cardElements[0].addEventListener(
      "animationend",
      () => {
        const newCards = [...cards.slice(1)];
        setCards(newCards);
      },
      { once: true }
    );
  }
};

export const handleRightClick = (cards, setCards) => {
  const cardElements = document.querySelectorAll(".card");
  if (cardElements[0]) {
    cardElements[0].classList.remove("flipped");
    cardElements[0].classList.add("move-right");
    cardElements[0].addEventListener(
      "animationend",
      () => {
        const newCards = [...cards.slice(1), cards[0]];
        setCards(newCards);
        cardElements[0].classList.remove("move-right");
        updateZIndex(cards);
      },
      { once: true }
    );
  }
};
