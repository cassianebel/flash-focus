import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Card from "./Card";

const Deck = ({ user }) => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [initialCards, setInitialCards] = useState([]);

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const deckRef = doc(db, "Decks", deckId);
        const deckSnapshot = await getDoc(deckRef);
        if (deckSnapshot.exists()) {
          setDeck(deckSnapshot.data());
          const cardsRef = collection(db, `Decks/${deckId}/cards`);
          const cardSnapshot = await getDocs(cardsRef);
          let fetchedCards = cardSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          fetchedCards = shuffleArray(fetchedCards);
          setCards(fetchedCards);
          setInitialCards(fetchedCards);
        } else {
          console.log("Deck not found");
        }
      } catch (error) {
        console.error("Error fetching deck or cards:", error);
      }
    };

    fetchDeckAndCards();
  }, [deckId]);

  // Fisher-Yates shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetDeck = () => setCards(shuffleArray(initialCards));

  const bgColor = {
    red: "bg-red-400 dark:bg-red-600",
    orange: "bg-orange-400 dark:bg-orange-600",
    amber: "bg-amber-400 dark:bg-amber-600",
    yellow: "bg-yellow-400 dark:bg-yellow-600",
    lime: "bg-lime-400 dark:bg-lime-600",
    green: "bg-green-400 dark:bg-green-600",
    emerald: "bg-emerald-400 dark:bg-emerald-600",
    teal: "bg-teal-400 dark:bg-teal-600",
    cyan: "bg-cyan-400 dark:bg-cyan-600",
    sky: "bg-sky-400 dark:bg-sky-600",
    blue: "bg-blue-400 dark:bg-blue-600",
    indigo: "bg-indigo-400 dark:bg-indigo-600",
    violet: "bg-violet-400 dark:bg-violet-600",
    purple: "bg-purple-400 dark:bg-purple-600",
    fuchsia: "bg-fuchsia-400 dark:bg-fuchsia-600",
    pink: "bg-pink-400 dark:bg-pink-600",
    rose: "bg-rose-400 dark:bg-rose-600",
  };
  const headingColor = {
    red: "text-red-700 dark:text-red-300",
    orange: "text-orange-700 dark:text-orange-300",
    amber: "text-amber-700 dark:text-amber-300",
    yellow: "text-yellow-700 dark:text-yellow-300",
    lime: "text-lime-700 dark:text-lime-300",
    green: "text-green-700 dark:text-green-300",
    emerald: "text-emerald-700 dark:text-emerald-300",
    teal: "text-teal-700 dark:text-teal-300",
    cyan: "text-cyan-700 dark:text-cyan-300",
    sky: "text-sky-700 dark:text-sky-300",
    blue: "text-blue-700 dark:text-blue-300",
    indigo: "text-indigo-700 dark:text-indigo-300",
    violet: "text-violet-700 dark:text-violet-300",
    purple: "text-purple-700 dark:text-purple-300",
    fuchsia: "text-fuchsia-700 dark:text-fuchsia-300",
    pink: "text-pink-700 dark:text-pink-300",
    rose: "text-rose-700 dark:text-rose-300",
  };
  const questionColor = {
    red: "bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-100",
    orange:
      "bg-orange-200 text-orange-700 dark:bg-orange-800 dark:text-orange-100",
    amber: "bg-amber-200 text-amber-700 dark:bg-amber-800 dark:text-amber-100",
    yellow:
      "bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100",
    lime: "bg-lime-200 text-lime-700 dark:bg-lime-800 dark:text-lime-100",
    green: "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-100",
    emerald:
      "bg-emerald-200 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-100",
    teal: "bg-teal-200 text-teal-700 dark:bg-teal-800 dark:text-teal-100",
    cyan: "bg-cyan-200 text-cyan-700 dark:bg-cyan-800 dark:text-cyan-100",
    sky: "bg-sky-200 text-sky-700 dark:bg-sky-800 dark:text-sky-100",
    blue: "bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-100",
    indigo:
      "bg-indigo-200 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-100",
    violet:
      "bg-violet-200 text-violet-700 dark:bg-violet-800 dark:text-violet-100",
    purple:
      "bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-100",
    fuchsia:
      "bg-fucshia-200 text-fucshia-700 dark:bg-fucshia-800 dark:text-fucshia-100",
    pink: "bg-pink-200 text-pink-700 dark:bg-pink-800 dark:text-pink-100",
    rose: "bg-rose-200 text-rose-700 dark:bg-rose-800 dark:text-rose-100",
  };
  const answerColor = {
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    orange:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    yellow:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    lime: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    emerald:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    teal: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    sky: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    indigo:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    violet:
      "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
    purple:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    fuchsia:
      "bg-fucshia-100 text-fucshia-800 dark:bg-fucshia-900 dark:text-fucshia-200",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    rose: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  };

  return (
    <>
      {deck && (
        <div
          className={`flex flex-col gap-10 items-center justify-center grow h-full p-5 ${
            bgColor[deck.color]
          }`}
        >
          <h2
            className={`text-3xl kaushan-script-regular text-center ${
              headingColor[deck.color]
            }`}
          >
            {deck.title}
          </h2>
          <div className="card-container">
            {cards.length === 0 ? (
              <button
                onClick={resetDeck}
                className="p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
              >
                Reset Deck
              </button>
            ) : (
              cards.map((card) => (
                <Card key={card.id} setCards={setCards}>
                  <div
                    className={`front flex items-center justify-center ${
                      questionColor[deck.color]
                    }`}
                  >
                    <p className="text-2xl text-center m-6">
                      {flipped ? card.answer : card.question}
                    </p>
                  </div>
                  <div
                    className={`back flex items-center justify-center ${
                      answerColor[deck.color]
                    }`}
                  >
                    <p className="text-2xl text-center m-6 ">
                      {flipped ? card.question : card.answer}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
          {cards.length !== 0 && (
            <button
              onClick={() => setFlipped(!flipped)}
              className={`p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50`}
            >
              Flip the Deck
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Deck;
