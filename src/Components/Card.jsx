import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Card = ({ children, setCards }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [cardVisible, setCardVisible] = useState(true);

  let xi = 0;
  let yi = 0;
  let opacityFramesOriginal = 400;
  let opacityFrames = 400;

  // Function to animate the card swipe-out
  const swipeOut = (xStart, yStart) => {
    const animate = () => {
      const xNext = xStart + xi;
      const yNext = yStart + yi;
      setTransform({ x: xNext, y: yNext });
      setOpacity(1 / opacityFrames);

      // Update xi and yi for animation
      xi += xStart < 0 ? -1 : 1;
      yi += yStart < 0 ? -1 : 1;

      opacityFrames--;

      if (opacityFrames > opacityFramesOriginal - 10) {
        requestAnimationFrame(animate);
      } else {
        setCardVisible(false); // Remove card after animation
      }
    };
    requestAnimationFrame(animate);
  };

  // Handlers for swipeable events
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      swipeOut(eventData.deltaX, eventData.deltaY);
      setCards((prevCards) => prevCards.slice(1));
    },
    onSwiping: (eventData) => {
      setTransform({ x: eventData.deltaX, y: eventData.deltaY });
    },
    onSwipedLeft: () => console.log("Swiped Left!"),
    onSwipedRight: () => console.log("Swiped Right!"),
    trackMouse: true, // Allows mouse swiping
  });

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      swipeOut(e.key === "ArrowRight" ? 1000 : -1000, 0);
      setCards((prevCards) => prevCards.slice(1));
      focusNextCard();
    }
  };

  const focusNextCard = () => {
    const nextCard = document.querySelectorAll(".card");
    console.log("Next card:", nextCard[1]);
    if (nextCard[1]) {
      nextCard[1].focus();
    }
  };

  const handleFlip = (e) => {
    const card = e.currentTarget;
    card.classList.toggle("flipped");
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
