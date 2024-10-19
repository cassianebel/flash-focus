import { useState, useEffect } from "react";
import { IoInvertMode } from "react-icons/io5";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

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
      <div className="flex flex-col justify-between h-screen bg-zinc-200 dark:bg-zinc-900">
        <header className="flex justify-between p-4 bg-zinc-300 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
          <h1 className="kaushan-script-regular text-3xl ">Flash Focus</h1>
          <button
            onClick={toggleTheme}
            className="text-xl px-4 py-2 rounded-full"
          >
            <IoInvertMode />
            <span className="sr-only">Toggle Theme</span>
          </button>
        </header>
        <footer className=" bg-zinc-300 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"></footer>
      </div>
    </div>
  );
}

export default App;
