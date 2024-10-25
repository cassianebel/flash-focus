import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserInDatabase } from "../firestoreUtils";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleSignIn() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const authUser = result.user;
      // Create or update user in Firestore
      await createUserInDatabase({ email: authUser.email, uid: authUser.uid });
      // navigate("/flash-focus/decks");
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      alert("Failed to log in with Google");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full my-3 p-2 px-4 bg-zinc-800 text-zinc-300 rounded-md flex items-center justify-center gap-2 hover:bg-zinc-700 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <span>Sign in with Google</span>
      <FcGoogle />
    </button>
  );
}

export default GoogleSignIn;
