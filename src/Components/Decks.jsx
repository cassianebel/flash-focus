import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchPublicDecks } from "../firestoreUtils";

const Decks = ({ userData }) => {
  const [publicDecks, setPublicDecks] = useState([]);

  useEffect(() => {
    const fetchDecksData = async () => {
      const decksData = await fetchPublicDecks();
      setPublicDecks(decksData);
    };
    fetchDecksData();
  }, []);

  return (
    <>
      <h2 className="mb-5 text-center text-2xl kaushan-script-regular">
        Decks
      </h2>
      <ul className="flex flex-wrap justify-center gap-5">
        {publicDecks.map((deck) => (
          <li key={deck.id} className="p-5">
            <NavLink to={`${deck.id}`} className="text-xl">
              {deck.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Decks;
