import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserInDatabase } from "../firestoreUtils";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./SignInGoogle";

function SignIn({ setUserData, userData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const results = await signInWithEmailAndPassword(auth, email, password);
      const authUser = results.user;
      setUserData((prevUserData) => ({
        ...prevUserData,
        email: authUser.email,
        uid: authUser.uid,
      }));
      // Create or update user in Firestore
      await createUserInDatabase({ email: authUser.email, uid: authUser.uid });
      navigate("/flash-focus/decks");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-w-80 mx-auto p-5">
      <h3 className="mb-5 text-center text-2xl kaushan-script-regular">
        Sign In
      </h3>
      {error && <p className="">{error}</p>}
      <form onSubmit={handleSignIn}>
        <label htmlFor="email" className="block mx-2">
          Email
        </label>
        <input
          className="block w-full p-2 mb-2 border border-zinc-300 rounded-md dark:border-zinc-700 dark:bg-zinc-800"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="block mx-2">
          Password
        </label>
        <input
          className="block w-full p-2 mb-2 border border-zinc-300 rounded-md dark:border-zinc-700 dark:bg-zinc-800"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full my-3 p-2 px-4 bg-zinc-950 text-zinc-300 rounded-md hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-50"
        >
          Sign In
        </button>
      </form>
      <p className="my-2 text-center text-lg kaushan-script-regular">- OR -</p>
      <GoogleSignIn setUserData={setUserData} userData={userData} />
      <p className="mt-5">
        No Account?{" "}
        <button
          onClick={() => navigate(`/flash-focus/signup`)}
          className="underline font-semibold px-1"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default SignIn;
