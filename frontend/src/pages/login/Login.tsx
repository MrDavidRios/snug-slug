import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import googleIcon from "../../assets/google-logo.svg";
import { Hero } from "../../components/hero/Hero";

export const Login: React.FC = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signInWithGoogle = () => signInWithPopup(auth, provider);

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
