import React, { useContext } from "react";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/google-logo.svg";
import { UserContext, UserContextType } from "../../components/UserContext";
import { Button } from "../../components/button/Button";
import { Hero } from "../../components/hero/Hero";
import { exampleUserA } from "../../utils/inboxtestdata";

export const Login: React.FC = () => {
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();

  const { slug, setSlug } = useContext(UserContext) as UserContextType;

  const signInWithGoogle = () => {
    //signInWithPopup(auth, provider)

    // Log in with example user
    setSlug(exampleUserA);
  };

  return (
    <div id="loginPageWrapper">
      {slug ? (
        <>
          <h1>Logged in!</h1>
          <Link to="/">
            <Button className="action" text="Homepage" />
          </Link>
        </>
      ) : (
        <>
          <Hero vertical={true} />
          <p className="italics" style={{ padding: 10 }}>
            The trusted subleasing platform for our Columbia University community.
          </p>
          <button onClick={signInWithGoogle} id="googleSignInBtn">
            <img src={googleIcon} />
            <p>Sign in with Google</p>
          </button>
        </>
      )}
    </div>
  );
};
