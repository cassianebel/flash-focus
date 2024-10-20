import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignOut({ setUserData }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        //navigate("/flash-focus/signin");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

export default SignOut;
