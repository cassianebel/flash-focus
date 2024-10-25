import SignUp from "./SignUp";
import { NavLink } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <>
      <div>
        {user && <p className="text-center">Welcome Back!</p>}

        <p className="text-center my-3">
          What would you like to focus on today?
        </p>
        <div className="flex justify-center gap-5 flex-wrap my-10">
          <NavLink
            to="/flash-focus/decks"
            className="p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
          >
            Study Existing Decks
          </NavLink>
          <NavLink
            to="/flash-focus/create"
            className="p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
          >
            Create a New Deck
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
