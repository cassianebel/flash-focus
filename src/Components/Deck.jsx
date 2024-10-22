import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Deck = ({ user }) => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const deckRef = doc(db, "Decks", deckId);
        const deckSnapshot = await getDoc(deckRef);
        if (deckSnapshot.exists()) {
          setDeck(deckSnapshot.data());
          const cardsRef = collection(db, `Decks/${deckId}/cards`);
          const cardSnapshot = await getDocs(cardsRef);
          const fetchedCards = cardSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCards(fetchedCards);
        } else {
          console.log("Deck not found");
        }
      } catch (error) {
        console.error("Error fetching deck or cards:", error);
      }
    };

    fetchDeckAndCards();
  }, [deckId]);

  return (
    <>
      {deck && (
        <div className="p-5">
          <h2 className="text-2xl kaushan-script-regular text-center">
            {deck.title}
          </h2>
          <ul>
            {cards.map((card) => (
              <li key={card.id}>
                {card.question} - {card.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Deck;
