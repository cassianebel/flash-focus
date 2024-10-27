import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import SignIn from "./SignIn";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

const EditDeck = ({ user }) => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [deckColor, setDeckColor] = useState("red");
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

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
          setCards(fetchedCards);
          setIsPublic(deckSnapshot.data().public);
          setDeckColor(deckSnapshot.data().color);
          setDeckTitle(deckSnapshot.data().title);
        } else {
          console.log("Deck not found");
        }
      } catch (error) {
        console.error("Error fetching deck or cards:", error);
      }
    };

    fetchDeckAndCards();
  }, [deckId]);

  const colors = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ];
  const colorClasses = {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("You must be signed in to edit a deck.");
      return;
    }

    const updatedData = {
      title: deckTitle,
      color: deckColor,
      public: isPublic,
    };

    try {
      await updateDeck(deckId, updatedData);
      console.log("Deck updated successfully!");
      // Delete cards marked for deletion
      const cardsToDelete = cards.filter((card) => card.toBeDeleted);
      for (const card of cardsToDelete) {
        await deleteCard(deckId, card.id);
      }

      // Update or add remaining cards
      const cardsToUpdate = cards.filter((card) => !card.toBeDeleted);
      for (const card of cardsToUpdate) {
        if (!card.id) {
          await addCard(deckId, card);
        } else {
          await updateCard(deckId, card.id, card);
        }
      }

      navigate(`/flash-focus/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const updateDeck = async (deckId, updatedData) => {
    try {
      const deckRef = doc(db, "Decks", deckId);
      await updateDoc(deckRef, updatedData);
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const updateCard = async (deckId, cardId, updatedData) => {
    try {
      const cardRef = doc(db, `Decks/${deckId}/cards`, cardId);
      await updateDoc(cardRef, updatedData);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const handleFlashcardChange = (index, e) => {
    const newFlashcards = [...cards];
    newFlashcards[index][e.target.name] = e.target.value;
    setCards(newFlashcards);
  };

  const addFlashcard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const addCard = async (deckId, newCard) => {
    try {
      const cardsRef = collection(db, `Decks/${deckId}/cards`);
      const docRef = await addDoc(cardsRef, newCard);
      console.log("Card added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const deleteCard = async (deckId, cardId) => {
    try {
      const cardRef = doc(db, `Decks/${deckId}/cards`, cardId);
      await deleteDoc(cardRef);
      console.log("Card deleted successfully!");
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleDeleteCard = (cardId) => {
    console.log("Deleting card with ID:", cardId); // Log the card ID
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === cardId ? { ...card, toBeDeleted: true } : card
      );
      console.log("Updated cards:", updatedCards); // Log the updated cards
      return updatedCards;
    });
  };

  const handleAddBackCard = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, toBeDeleted: false } : card
      )
    );
  };

  if (!user) {
    return (
      <>
        <p className="text-center">You need to sign in to edit a deck.</p>
        <SignIn />
      </>
    );
  }

  return (
    <div className="w-5/6 mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-5 items-center">
          <div className="grow">
            <label htmlFor="deck-title" className="block mx-2">
              Deck Title
            </label>
            <input
              value={deckTitle}
              type="text"
              id="deck-title"
              name="deck-title"
              onChange={(e) => setDeckTitle(e.target.value)}
              required
              className="block w-full p-2 mb-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="block m-2 my-4">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="m-1"
              />
              Make Deck Public
            </label>
          </div>
        </div>
        <div className="md:flex gap-5">
          <div className="my-5">
            <label htmlFor="deck-color" className="block mx-2">
              Deck Color
            </label>
            {colors.map((color) => (
              <label
                key={color}
                className={`${colorClasses[color]} block p-2 m-1 has-[:checked]:scale-110 transition-all duration-300 ease-in-out rounded-md`}
              >
                <input
                  type="radio"
                  id={color}
                  name="deck-color"
                  value={color}
                  className="mx-2"
                  checked={deckColor === color}
                  onChange={(e) => setDeckColor(e.target.value)}
                />
                {color}
              </label>
            ))}
          </div>
          <div className="my-5 grow">
            <h3 className="mb-3">Create Flashcards</h3>
            {cards.map((flashcard, index) => (
              <div
                key={index}
                className="p-4 my-3 bg-zinc-200 dark:bg-zinc-600 rounded-md"
                style={flashcard.toBeDeleted === true ? { opacity: "25%" } : {}}
              >
                <label className="block mx-2">
                  Question / Front {index + 1}
                </label>
                <input
                  type="text"
                  name="question"
                  value={flashcard.question}
                  onChange={(e) => handleFlashcardChange(index, e)}
                  required
                  className="block w-full p-2 mb-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800"
                />
                <label className="block mx-2">Answer / Back {index + 1}</label>
                <input
                  type="text"
                  name="answer"
                  value={flashcard.answer}
                  onChange={(e) => handleFlashcardChange(index, e)}
                  required
                  className="block w-full p-2 mb-2 border border-zinc-300 rounded-md dark:border-zinc-600 dark:bg-zinc-800"
                />
                {flashcard.toBeDeleted === true ? (
                  <button
                    type="button"
                    onClick={() => handleAddBackCard(flashcard.id)}
                    className="flex items-center gap-2 my-3 p-2 px-4 bg-zinc-700 text-zinc-200 rounded-md hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    <IoIosAddCircle /> Add Card Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleDeleteCard(flashcard.id)}
                    className="flex items-center gap-2 my-3 p-2 px-4 bg-zinc-700 text-zinc-200 rounded-md hover:bg-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100"
                  >
                    <IoIosRemoveCircle /> Remove Card
                  </button>
                )}
              </div>
            ))}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={addFlashcard}
                className="flex items-center gap-2 my-3 me-3 p-2 px-4 bg-zinc-800 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
              >
                <IoIosAddCircle /> Add another flashcard
              </button>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full my-3 p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
        >
          Update Deck
        </button>
      </form>
    </div>
  );
};

export default EditDeck;
