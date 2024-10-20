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
      <h2 className="text-3xl mb-5">Sign In</h2>
      {error && <p className="">{error}</p>}
      <form onSubmit={handleSignIn}>
        <label htmlFor="email" className="mx-1">
          Email
        </label>
        <input
          className=""
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mx-1">
          Password
        </label>
        <input
          className=""
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="">
          Sign In
        </button>
      </form>
      <GoogleSignIn setUserData={setUserData} userData={userData} />
      <p className="mt-5">
        No Account?{" "}
        <button onClick={() => navigate(`/flash-focus/signup`)} className="">
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default SignIn;
