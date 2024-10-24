import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const Card = ({ children }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [cardVisible, setCardVisible] = useState(true);

  let xi = 0;
  let yi = 0;
  let opacityFramesOriginal = 200;
  let opacityFrames = 200;

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
    },
    onSwiping: (eventData) => {
      setTransform({ x: eventData.deltaX, y: eventData.deltaY });
    },
    onSwipedLeft: () => console.log("Swiped Left!"),
    onSwipedRight: () => console.log("Swiped Right!"),
    trackMouse: true, // Allows mouse swiping
  });

  // Reset card's position and opacity after pan ends
  const handlePanEnd = () => {
    setTransform({ x: 0, y: 0 });
    setOpacity(1);
  };

  const handleFlip = (e) => {
    const card = e.currentTarget;
    card.classList.toggle("flipped");
  };

  const rotation = () => {
    return Math.floor(Math.random() * 10) - 5;
  };

  return cardVisible ? (
    <div
      {...handlers}
      onMouseUp={handlePanEnd}
      onTouchEnd={handlePanEnd}
      onClick={handleFlip}
      style={{
        transform: `translate(${transform.x}px, ${
          transform.y
        }px) rotate(${rotation()}deg)`,
        opacity: opacity,
      }}
      className="card shadow-md"
    >
      {children}
    </div>
  ) : null;
};

export default Card;
