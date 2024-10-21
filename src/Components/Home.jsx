import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SignOut from "./SignOut";

const Home = ({ userData, setUserData, hasAccount, setHasAccount }) => {
  return (
    <>
      <h2>Home</h2>
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

export default Home;
