import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const CreateDeck = ({ user }) => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckColor, setDeckColor] = useState("red");
  const [isPublic, setIsPublic] = useState(false);

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
      await addDoc(collection(db, "Decks"), {
        title: deckTitle,
        public: isPublic,
        color: deckColor,
        userID: user.uid,
        createdAt: new Date(),
      });

      setDeckTitle("");
      setIsPublic(false);
    } catch (error) {
      console.error("Error creating deck: ", error);
    }
  };

  if (!user) {
    return <p>You need to sign in to create a deck.</p>;
  }

  return (
    <div className="min-w-80 mx-auto p-5">
      <form onSubmit={handleSubmit}>
        <label htmlFor="deck-title" className="block mx-2">
          Deck Title
        </label>
        <input
          type="text"
          id="deck-title"
          name="deck-title"
          onChange={(e) => setDeckTitle(e.target.value)}
          required
          className="block w-full p-2 mb-2 border border-zinc-300 rounded-md dark:border-zinc-700 dark:bg-zinc-800"
        />

        <label className="block m-2 my-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="m-1"
          />
          Make Deck Public
        </label>
        <label htmlFor="deck-color" className="block mx-2">
          Deck Color
        </label>
        <div className="">
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
        <button
          type="submit"
          className="w-full my-3 p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
        >
          Create Deck
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
