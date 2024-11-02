import { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Link from "./Link";

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
              <Link
                text="Study Existing Decks"
                link="/flash-focus/decks"
                style="primary"
              />
              <Link
                text="Create a New Deck"
                link="/flash-focus/create"
                style="secondary"
              />
            </div>
          </>
        ) : (
          <>
            {cards.length !== 0 ? (
              <h2 className="text-3xl kaushan-script-regular text-center my-10">
                Intro to Flash Focus
              </h2>
            ) : (
              <>
                <h2 className="text-3xl kaushan-script-regular text-center my-10">
                  Now Let's Get Started!
                </h2>
                <div className="flex justify-center gap-5 flex-wrap my-10">
                  <Link
                    text="Study Public Decks"
                    link="/flash-focus/decks"
                    style="primary"
                  />
                  <Link
                    text="Sign Up to Create a New Deck"
                    link="/flash-focus/signup"
                    style="secondary"
                  />
                </div>
              </>
            )}
            <div className="card-container">
              {cards.map((card) => (
                <Card key={card.id} setCards={setCards}>
                  <div className="front flex items-center justify-center bg-zinc-200 text-zinc-700 dark:bg-zinc-600 dark:text-zinc-100">
                    <p className="text-2xl text-center m-6">
                      {flipped ? card.answer : card.question}
                    </p>
                  </div>
                  <div className="back flex items-center justify-center bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
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
                    text="Flip the Deck"
                    action={() => setFlipped(!flipped)}
                    style="secondary"
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
