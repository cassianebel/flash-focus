import SignUp from "./SignUp";

const Home = ({ userData, setUserData }) => {
  return (
    <div>
      <h2>Home</h2>
      <SignUp userData={userData} setUserData={setUserData} />
    </div>
  );
};

export default Home;
