import { useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Profile = ({ userData, setUserData, hasAccount, setHasAccount }) => {
  return (
    <>
      <h2 className="mb-5 text-center text-2xl kaushan-script-regular">
        Profile
      </h2>
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
    </>
  );
};

export default Profile;
