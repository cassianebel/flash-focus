import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";

const Home = ({ user }) => {
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      question: "Click the the card to reveal the other side.",
      answer: "Swipe left or right to navigate the deck.",
    },
    {
      id: 2,
      question: "A swipe right moves card to the back of the stack.",
      answer: "So you can review it later",
    },
    {
      id: 3,
      question: "A swipe left removes the card from the stack.",
      answer: "So you don't have to see it again.",
    },
    {
      id: 4,
      question: "You can flip the entire deck by clicking the button below.",
      answer:
        "This will show the 'answer' side of all the cards in the deck so you can study them from the other side.",
    },
  ]);

  useEffect(() => {
    focusFirstCard();
  }, [cards]);

  const focusFirstCard = () => {
    const nextCard = document.querySelectorAll(".card");
    if (nextCard[0]) {
      nextCard[0].focus();
    }
  };

  return (
    <>
      <div>
        {user ? (
          <>
            <p className="text-3xl kaushan-script-regular text-center">
              Welcome Back!
            </p>
            <p className="text-center my-3">
              What would you like to focus on today?
            </p>
            <div className="flex justify-center gap-5 flex-wrap my-10">
              <NavLink
                to="/flash-focus/decks"
                className="p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
              >
                Study Existing Decks
              </NavLink>
              <NavLink
                to="/flash-focus/create"
                className="p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
              >
                Create a New Deck
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl kaushan-script-regular text-center my-10">
              Intro to Flash Focus
            </h2>
            <div className="card-container">
              {cards.map((card) => (
                <Card key={card.id} setCards={setCards}>
                  <div className="front flex items-center justify-center bg-zinc-400">
                    <p className="text-2xl text-center m-6">
                      {flipped ? card.answer : card.question}
                    </p>
                  </div>
                  <div className="back flex items-center justify-center bg-zinc-400">
                    <p className="text-2xl text-center m-6 ">
                      {flipped ? card.question : card.answer}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            {cards.length !== 0 && (
              <div className="flex justify-center my-10">
                <div>
                  <Button
                    text="Start Again"
                    action={() => setCards([])}
                    style="primary"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
