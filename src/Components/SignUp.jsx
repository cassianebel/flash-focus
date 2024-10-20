import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleSignIn from "./SignInGoogle";

function SignUp({ setUserData, userData, hasAccount, setHasAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const saveAccountStatus = () => {
    localStorage.setItem("hasAccount", true);
    setHasAccount(true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      saveAccountStatus();
      navigate("/flash-focus/signin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="">
      <h2 className="">Sign Up</h2>
      {error && <p className="">{error}</p>}
      <form onSubmit={handleSignUp}>
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
          Sign Up
        </button>
      </form>
      <GoogleSignIn
        setUserData={setUserData}
        userData={userData}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
      />
      <p className="mt-5">
        Have an Account?{" "}
        <button onClick={() => navigate(`/flash-focus/signin`)} className="">
          Sign In
        </button>
      </p>
    </div>
  );
}

export default SignUp;
