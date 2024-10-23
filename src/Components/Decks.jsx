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

  return (
    <>
      <div>
        <h2 className="mb-5 text-center text-2xl kaushan-script-regular">
          Your Decks
        </h2>
        <ul className="flex flex-wrap justify-center gap-5">
          {user &&
            user.uid &&
            privateDecks.map((deck) => (
              <li key={deck.id} className="p-5">
                <NavLink
                  to={`${deck.id}`}
                  className={`text-xl p-3 px-5 rounded-md bg-${deck.color}-400 dark:bg-${deck.color}-600`}
                >
                  {deck.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-5 text-center text-2xl kaushan-script-regular">
          Public Decks
        </h2>
        <ul className="flex flex-wrap justify-center gap-5">
          {publicDecks.map((deck) => (
            <li key={deck.id} className="p-5">
              <NavLink
                to={`${deck.id}`}
                className={`text-xl p-3 px-5 rounded-md bg-${deck.color}-400 dark:bg-${deck.color}-600`}
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
