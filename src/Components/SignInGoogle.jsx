import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserInDatabase } from "../firestoreUtils";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleSignIn({ setUserData, userData, hasAccount, setHasAccount }) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const saveAccountStatus = () => {
    localStorage.setItem("hasAccount", true);
    setHasAccount(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const authUser = result.user;
      setUserData((prevUserData) => ({
        ...prevUserData,
        email: authUser.email,
        uid: authUser.uid,
      }));
      // Create or update user in Firestore
      await createUserInDatabase({ email: authUser.email, uid: authUser.uid });
      saveAccountStatus();
      navigate("/flash-focus/decks");
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Failed to log in with Google");
    }
  };

  return (
    <button onClick={handleGoogleSignIn} className="">
      <span>Sign in with Google</span>
      <FcGoogle />
    </button>
  );
}

export default GoogleSignIn;
