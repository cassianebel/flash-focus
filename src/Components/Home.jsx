import SignUp from "./SignUp";
import { NavLink } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <>
      {user ? (
        <div>
          <p className="text-center">Welcome Back!</p>
          <p className="text-center my-3">
            What would you like to focus on today?
          </p>
          <div className="flex justify-center gap-5 flex-wrap">
            <NavLink
              to="/flash-focus/decks"
              className="text-xl p-2 px-4 rounded-md bg-zinc-800 text-zinc-300"
            >
              Study Existing Decks
            </NavLink>
            <NavLink
              to="/flash-focus/create"
              className="text-xl p-2 px-4 rounded-md bg-zinc-800 text-zinc-300"
            >
              Create a New Deck
            </NavLink>
          </div>
        </div>
      ) : (
        <SignUp />
      )}
    </>
  );
};

export default Home;
