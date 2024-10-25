import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchPublicDecks, fetchPrivateDecks } from "../firestoreUtils";

const Decks = ({ user }) => {
  const [publicDecks, setPublicDecks] = useState([]);
  const [privateDecks, setPrivateDecks] = useState([]);

  useEffect(() => {
    const fetchDecksData = async () => {
      const decksData = await fetchPublicDecks();
      setPublicDecks(decksData);
      const userDecksData = await fetchPrivateDecks(user.uid);
      setPrivateDecks(userDecksData);
    };
    fetchDecksData();
  }, []);

  const bgColor = {
    red: "bg-red-400 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600",
    orange:
      "bg-orange-400 hover:bg-orange-500 dark:bg-orange-700 dark:hover:bg-orange-600",
    amber:
      "bg-amber-400 hover:bg-amber-500 dark:bg-amber-700 dark:hover:bg-amber-600",
    yellow:
      "bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-600",
    lime: "bg-lime-400 hover:bg-lime-500 dark:bg-lime-700 dark:hover:bg-lime-600",
    green:
      "bg-green-400 hover:bg-green-500 dark:bg-green-700 dark:hover:bg-green-600",
    emerald:
      "bg-emerald-400 hover:bg-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600",
    teal: "bg-teal-400 hover:bg-teal-500 dark:bg-teal-700 dark:hover:bg-teal-600",
    cyan: "bg-cyan-400 hover:bg-cyan-500 dark:bg-cyan-700 dark:hover:bg-cyan-600",
    sky: "bg-sky-400 hover:bg-sky-500 dark:bg-sky-700 dark:hover:bg-sky-600",
    blue: "bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600",
    indigo:
      "bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600",
    violet:
      "bg-violet-400 hover:bg-violet-500 dark:bg-violet-700 dark:hover:bg-violet-600",
    purple:
      "bg-purple-400 hover:bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-600",
    fuchsia:
      "bg-fuchsia-400 hover:bg-fuchsia-500 dark:bg-fuchsia-700 dark:hover:bg-fuchsia-600",
    pink: "bg-pink-400 hover:bg-pink-500 dark:bg-pink-700 dark:hover:bg-pink-600",
    rose: "bg-rose-400 hover:bg-rose-500 dark:bg-rose-700 dark:hover:bg-rose-600",
  };

  return (
    <>
      <div>
        <h2 className="my-5 text-center text-3xl kaushan-script-regular">
          Your Decks
        </h2>
        <ul className="sm:flex flex-wrap justify-center text-center gap-5">
          {user &&
            user.uid &&
            privateDecks.map((deck) => (
              <li key={deck.id} className="block m-5">
                <NavLink
                  to={`${deck.id}`}
                  className={`block text-xl text-center p-3 px-5 rounded-md ${
                    bgColor[deck.color]
                  }`}
                >
                  {deck.title}
                </NavLink>
              </li>
            ))}
        </ul>
        <p className="text-center m-10">
          <NavLink
            to="/flash-focus/create"
            className="text-xl p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
          >
            Create a New Deck
          </NavLink>
        </p>
      </div>
      <div>
        <h2 className="my-5 text-center text-3xl kaushan-script-regular">
          Public Decks
        </h2>
        <ul className="sm:flex flex-wrap justify-center text-center gap-5">
          {publicDecks.map((deck) => (
            <li key={deck.id} className="block m-5">
              <NavLink
                to={`${deck.id}`}
                className={`block text-xl p-3 px-5 rounded-md ${
                  bgColor[deck.color]
                }`}
              >
                {deck.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Decks;
