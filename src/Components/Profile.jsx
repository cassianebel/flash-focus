import { useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Profile = ({ userData, setUserData, hasAccount, setHasAccount }) => {
  return (
    <div>
      <h2>Profile</h2>
      {userData && userData.email ? (
        <SignOut setUserData={setUserData} />
      ) : hasAccount === true ? (
        <SignIn setUserData={setUserData} userData={userData} />
      ) : (
        <SignUp
          userData={userData}
          setUserData={setUserData}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
        />
      )}
    </div>
  );
};

export default Profile;
