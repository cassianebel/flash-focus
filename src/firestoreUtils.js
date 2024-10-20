import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createUserInDatabase = async (user) => {
  try {
    const userDocRef = doc(db, "Users", user.uid);
    await setDoc(
      userDocRef,
      {
        email: user.email,
      },
      { merge: true }
    );

    console.log("User data saved to Firestore");
  } catch (error) {
    console.error("Error creating/updating user in Firestore:", error.message);
  }
};
