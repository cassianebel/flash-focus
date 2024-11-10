import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Card = ({ children, cards, setCards }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [cardVisible, setCardVisible] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);

  let xi = 0;
  const opacityFramesOriginal = 20;
  let opacityFrames = opacityFramesOriginal;

  // Function to animate the card swipe-out
  const swipeOut = (xStart) => {
    const animate = () => {
      const xNext = xStart + xi;
      setTransform({ x: xNext, y: 0 }); // Keep y constant at 0
      setOpacity(opacityFrames / opacityFramesOriginal);

      // Update xi for animation
      xi += xStart < 0 ? -5 : 5;

      opacityFrames--;

      if (opacityFrames > 0) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // Function to animate card to snap back to original position and opacity
  const snapBack = () => {
    let opacityFrames = -20;
    const animate = () => {
      const xNext = xi;
      setTransform({ x: xNext, y: 0 });
      setOpacity(opacityFrames / opacityFramesOriginal);

      xi += xi > 0 ? -5 : 5;

      opacityFrames++;

      if (opacityFrames <= opacityFramesOriginal) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  // Handlers for swipeable events
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setIsSwiping(true);
      setTransform({ x: eventData.deltaX, y: 0 });
    },
    onSwipedLeft: () => {
      const cardElements = document.querySelectorAll(".card");
      if (cardElements[0]) {
        cardElements[0].classList.remove("flipped");
        swipeOut(-100);
        setCardVisible(false); // Remove card after animation
        setCards((prevCards) => prevCards.slice(1)); // Remove the card from the deck
        setIsSwiping(false);
      }
    },
    onSwipedRight: () => {
      const cardElements = document.querySelectorAll(".card");
      if (cardElements[0]) {
        cardElements[0].classList.remove("flipped");
        swipeOut(100);
        snapBack();
        setCards((prevCards) => [...prevCards.slice(1), prevCards[0]]); // move the card to the end of the deck
        setIsSwiping(false);
      }
    },
    trackMouse: true, // Allows mouse swiping
  });

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.target.classList.remove("flipped");
      e.target.classList.add("move-left");
      e.target.addEventListener(
        "animationend",
        () => {
          const newCards = [...cards.slice(1)];
          setCards(newCards);
        },
        { once: true }
      );
      focusNextCard();
    } else if (e.key === "ArrowRight") {
      e.target.classList.remove("flipped");
      e.target.classList.add("move-right");
      e.target.addEventListener(
        "animationend",
        () => {
          const newCards = [...cards.slice(1), cards[0]];
          setCards(newCards);
          e.target.classList.remove("move-right");
          //updateZIndex(cards);
        },
        { once: true }
      );
      setCards((prevCards) => [...prevCards.slice(1), prevCards[0]]);
      focusNextCard();
    }
  };

  const focusNextCard = () => {
    const nextCard = document.querySelectorAll(".card");
    if (nextCard[1]) {
      nextCard[1].focus();
    }
  };

  const handleFlip = (e) => {
    if (!isSwiping) {
      const card = e.currentTarget;
      card.classList.toggle("flipped");
    }
  };

  const rotation = () => {
    return Math.floor(Math.random() * 10) - 5;
  };

  return cardVisible ? (
    <button
      {...handlers}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      style={{
        transform: `translate(${transform.x}px, ${
          transform.y
        }px) rotate(${rotation()}deg)`,
        opacity: opacity,
      }}
      className="card shadow-md"
    >
      {children}
    </button>
  ) : null;
};

export default Card;
