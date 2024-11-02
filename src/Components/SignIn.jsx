import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserInDatabase } from "../firestoreUtils";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./SignInGoogle";
import Button from "./Button";
import Error from "./Error";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const results = await signInWithEmailAndPassword(auth, email, password);
      const authUser = results.user;
      // Create or update user in Firestore
      await createUserInDatabase({ email: authUser.email, uid: authUser.uid });
      // navigate("/flash-focus/decks");
    } catch (error) {
      console.log(error.code);
      console.error(error);
      if (error.code === "auth/invalid-credential") {
        setError("Invalid Credentials");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="min-w-80 max-w-sm mx-auto p-5">
      <h3 className="mb-5 text-center text-2xl kaushan-script-regular">
        Sign In
      </h3>
      {error && <Error errorText={error} />}
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
        <Button text="Sign In" type="submit" style="primary" />
      </form>
      <p className="my-2 text-center text-lg kaushan-script-regular">- OR -</p>
      <GoogleSignIn />
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
