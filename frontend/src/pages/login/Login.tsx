import React, { useContext } from "react";
import googleIcon from "../../assets/google-logo.svg";
import { UserContext, UserContextType } from "../../components/UserContext";
import { Hero } from "../../components/hero/Hero";
import { exampleUserA } from "../../utils/inboxtestdata";

export const Login: React.FC = () => {
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();

  const { setSlug } = useContext(UserContext) as UserContextType;

  const signInWithGoogle = () => {
    //signInWithPopup(auth, provider)

    // Log in with example user
    setSlug(exampleUserA);
  };

  return (
    <div id="loginPageWrapper">
      <Hero vertical={true} />
      <p className="italics" style={{ padding: 10 }}>
        The trusted subleasing platform for our Columbia University community.
      </p>
      <button onClick={signInWithGoogle} id="googleSignInBtn">
        <img src={googleIcon} />
        <p>Sign in with Google</p>
      </button>
    </div>
  );
};
