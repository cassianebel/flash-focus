import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import SignIn from "./SignIn";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import Button from "./Button";
import Input from "./Input";

const CreateDeck = ({ user }) => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [deckColor, setDeckColor] = useState("red");
  const [isPublic, setIsPublic] = useState(false);
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);
  const navigate = useNavigate();

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
      console.error("You must be signed in to create a deck.");
      return;
    }

    try {
      // Add a new deck document to the "Decks" collection
      const deckRef = await addDoc(collection(db, "Decks"), {
        title: deckTitle,
        description: deckDescription,
        public: isPublic,
        color: deckColor,
        userID: user.uid,
        createdAt: new Date(),
      });

      // Add each flashcard to the "cards" subcollection of the new deck
      flashcards.forEach(async (flashcard) => {
        await addDoc(collection(db, "Decks", deckRef.id, "cards"), {
          question: flashcard.question,
          answer: flashcard.answer,
          createdAt: new Date(),
        });
      });

      navigate(`/flash-focus/decks/${deckRef.id}`);
    } catch (error) {
      console.error("Error creating deck: ", error);
    }
  };

  const handleFlashcardChange = (index, e) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index][e.target.name] = e.target.value;
    setFlashcards(newFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
  };

  const removeLastCard = () => {
    if (flashcards.length > 1) {
      const newFlashcards = [...flashcards];
      newFlashcards.pop();
      setFlashcards(newFlashcards);
    }
  };

  if (!user) {
    return (
      <>
        <p className="text-center">You need to sign in to create a deck.</p>
        <SignIn />
      </>
    );
  }

  return (
    <div className="w-5/6 max-w-screen-2xl mx-auto my-10">
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-5 items-center">
          <div className="grow">
            <Input
              label="Deck Title"
              name="deck-title"
              type="text"
              value={deckTitle}
              changeHandler={(e) => setDeckTitle(e.target.value)}
              required={true}
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
        <div className="my-5">
          <Input
            label="Deck Description"
            name="deck-description"
            type="text"
            value={deckDescription}
            changeHandler={(e) => setDeckDescription(e.target.value)}
          />
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
            {flashcards.map((flashcard, index) => (
              <div
                key={index}
                className="p-4 my-3 bg-zinc-200 dark:bg-zinc-600 rounded-md"
              >
                <Input
                  label={`Question / Front ${index + 1}`}
                  name="question"
                  type="text"
                  value={flashcard.question}
                  changeHandler={(e) => handleFlashcardChange(index, e)}
                  required={true}
                  maxLength={200}
                />
                <Input
                  label={`Answer / Back ${index + 1}`}
                  name="answer"
                  type="text"
                  value={flashcard.answer}
                  changeHandler={(e) => handleFlashcardChange(index, e)}
                  required={true}
                  maxLength={200}
                />
              </div>
            ))}
            <div className="flex flex-wrap">
              <div className="me-3">
                <Button
                  text="Add another flashcard"
                  action={addFlashcard}
                  icon={<IoIosAddCircle />}
                  style="primary"
                />
              </div>
              <div>
                <Button
                  text="Remove last flashcard"
                  action={removeLastCard}
                  icon={<IoIosRemoveCircle />}
                  style="secondary"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items center my-6 ">
          <div className="me-3">
            <Button text="Create Deck" style="primary" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDeck;
