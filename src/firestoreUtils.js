import {
  doc,
  setDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
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

export const fetchPublicDecks = async () => {
  try {
    const decksCollectionRef = collection(db, "Decks");
    const decksQuery = query(decksCollectionRef, where("public", "==", true));
    const querySnapshot = await getDocs(decksQuery);
    const decks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return decks;
  } catch (error) {
    console.error("Error fetching decks:", error.message);
  }
};

export const fetchPrivateDecks = async (userID) => {
  try {
    const decksCollectionRef = collection(db, "Decks");
    const decksQuery = query(decksCollectionRef, where("userID", "==", userID));
    const querySnapshot = await getDocs(decksQuery);
    const decks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return decks;
  } catch (error) {
    console.error("Error fetching decks:", error.message);
  }
};
