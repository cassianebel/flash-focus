import { useState, useEffect } from "react";
import {
  updateZIndex,
  focusFirstCard,
  handleLeftClick,
  handleRightClick,
} from "../deckUtils";
import Card from "./Card";
import Button from "./Button";
import Link from "./Link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoInvertMode } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi2";

const Home = ({ user }) => {
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      question:
        "CLICK the the card to reveal the other side. (hit ENTER or SPACEBAR on keyboard)",
      answer:
        "Click the LEFT arrow to remove the card from the stack or the RIGHT arrow to move it to the back of the stack. (swipe on mobile)",
    },
    {
      id: 2,
      question: "Guess which icon in the top right corner toggles the theme.",
      answer: <IoInvertMode />,
    },
    {
      id: 3,
      question: "Guess which icon takes you to the deck list.",
      answer: <GoStack />,
    },
    {
      id: 4,
      question: "Guess which icon takes you to sign in or out.",
      answer: <HiUserCircle />,
    },
    {
      id: 5,
      question: "You can flip the entire deck by clicking the button below.",
      answer:
        "This will show the 'answer' side of all the cards in the deck so you can study them Jeopardy! style.",
    },
  ]);

  useEffect(() => {
    updateZIndex(cards);
    focusFirstCard();
  }, [cards]);

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
              <Link text="Study Existing Decks" link="/decks" style="primary" />
              <Link text="Create a New Deck" link="/create" style="secondary" />
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
                  Let's Get Started!
                </h2>
                <div className="flex justify-center gap-5 flex-wrap my-10">
                  <Link
                    text="View Public Decks"
                    link="/decks"
                    style="primary"
                  />
                  <Link
                    text="Sign Up to Create a New Deck"
                    link="/signup"
                    style="secondary"
                  />
                </div>
              </>
            )}
            <div className="flex justify-center gap-5">
              {cards.length > 0 && (
                <button
                  onClick={() => handleLeftClick(cards, setCards)}
                  className="hidden sm:block p-2"
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div className="card-container">
                {cards.map((card) => (
                  <Card key={card.id} cards={cards} setCards={setCards}>
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
              {cards.length > 0 && (
                <button
                  onClick={() => handleRightClick(cards, setCards)}
                  className="hidden sm:block p-2"
                >
                  <IoIosArrowForward />
                </button>
              )}
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
