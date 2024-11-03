import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchPublicDecks, fetchPrivateDecks } from "../firestoreUtils";
import Link from "./Link";
import { IoIosAddCircle } from "react-icons/io";

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
    red: "bg-red-400 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-600",
    orange:
      "bg-orange-400 hover:bg-orange-300 dark:bg-orange-700 dark:hover:bg-orange-600",
    amber:
      "bg-amber-400 hover:bg-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600",
    yellow:
      "bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-700 dark:hover:bg-yellow-600",
    lime: "bg-lime-400 hover:bg-lime-300 dark:bg-lime-700 dark:hover:bg-lime-600",
    green:
      "bg-green-400 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600",
    emerald:
      "bg-emerald-400 hover:bg-emerald-300 dark:bg-emerald-700 dark:hover:bg-emerald-600",
    teal: "bg-teal-400 hover:bg-teal-300 dark:bg-teal-700 dark:hover:bg-teal-600",
    cyan: "bg-cyan-400 hover:bg-cyan-300 dark:bg-cyan-700 dark:hover:bg-cyan-600",
    sky: "bg-sky-400 hover:bg-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600",
    blue: "bg-blue-400 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600",
    indigo:
      "bg-indigo-400 hover:bg-indigo-300 dark:bg-indigo-700 dark:hover:bg-indigo-600",
    violet:
      "bg-violet-400 hover:bg-violet-300 dark:bg-violet-700 dark:hover:bg-violet-600",
    purple:
      "bg-purple-400 hover:bg-purple-300 dark:bg-purple-700 dark:hover:bg-purple-600",
    fuchsia:
      "bg-fuchsia-400 hover:bg-fuchsia-300 dark:bg-fuchsia-700 dark:hover:bg-fuchsia-600",
    pink: "bg-pink-400 hover:bg-pink-300 dark:bg-pink-700 dark:hover:bg-pink-600",
    rose: "bg-rose-400 hover:bg-rose-300 dark:bg-rose-700 dark:hover:bg-rose-600",
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="my-5 text-center text-3xl kaushan-script-regular">
          Your Decks
        </h2>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-5">
          {user &&
            user.uid &&
            privateDecks.map((deck) => (
              <li key={deck.id} className="block">
                <NavLink
                  to={`${deck.id}`}
                  className={`flex flex-col justify-between h-full p-1 transition-all ease-in ${
                    bgColor[deck.color]
                  }`}
                >
                  <p className="font-light text-xl p-5">{deck.description}</p>
                  <h3 className="p-2 text-center text-2xl font-extrabold bg-zinc-50 bg-opacity-30 rounded-md">
                    {deck.title}
                  </h3>
                </NavLink>
              </li>
            ))}
          <li className="block">
            <NavLink
              to="/create"
              className="flex flex-col justify-between h-full p-1 transition-all ease-in bg-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700"
            >
              <p className="font-light text-xl p-5">
                Ready to challenge yourself? Create a new deck!
              </p>
              <h3 className="flex items-center justify-center gap-3 r p-2 text-center text-2xl font-extrabold bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 dark:bg-zinc-200  dark:text-zinc-900 dark:hover:bg-zinc-100 rounded-md">
                <IoIosAddCircle />
                <sppan>Create a Deck</sppan>
              </h3>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-10">
        <h2 className="my-5 text-center text-3xl kaushan-script-regular">
          Public Decks
        </h2>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 mx-5">
          {publicDecks.map((deck) => (
            <li key={deck.id} className="block">
              <NavLink
                to={`${deck.id}`}
                className={`flex flex-col justify-between h-full p-1 transition-all ease-in ${
                  bgColor[deck.color]
                }`}
              >
                <p className="font-light text-xl p-5">{deck.description}</p>
                <h3 className="p-2 text-center text-2xl font-extrabold bg-zinc-50 bg-opacity-30 rounded-md">
                  {deck.title}
                </h3>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Decks;
