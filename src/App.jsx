import { useState, useEffect } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { IoInvertMode } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi2";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Decks from "./Components/Decks";
import Deck from "./Components/Deck";
import CreateDeck from "./Components/CreateDeck";
import EditDeck from "./Components/EditDeck";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={theme}>
      <div className="flex flex-col justify-between min-h-screen bg-zinc-300 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-200">
        <div className="bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
          <header className="max-w-screen-2xl mx-auto flex justify-between items-center p-4 ">
            <h1 className="kaushan-script-regular text-2xl ">
              <NavLink to="/">Flash Focus</NavLink>
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="text-xl px-4 py-2 rounded-full"
              >
                <IoInvertMode />
                <span className="sr-only">Toggle Theme</span>
              </button>
              <NavLink to="/decks" className="text-xl px-4 py-2 rounded-full">
                <GoStack />
                <span className="sr-only">Flash Card Decks</span>
              </NavLink>
              <NavLink to="/profile" className="text-xl px-4 py-2 rounded-full">
                <HiUserCircle />
                <span className="sr-only">Profile</span>
              </NavLink>
            </div>
          </header>
        </div>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/create" element={<CreateDeck user={user} />} />
          <Route path="/decks" element={<Decks user={user} />} />
          <Route path="/decks/:deckId" element={<Deck user={user} />} />
          <Route path="/edit/:deckId" element={<EditDeck user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <footer className=" bg-zinc-300 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"></footer>
      </div>
    </div>
  );
}

export default App;
