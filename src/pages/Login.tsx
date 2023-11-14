import React from "react";
import { Hero } from "../components/hero/Hero";

export const Login: React.FC = () => {
  return (
    <div>
      <Hero />
      <h2>Login</h2>
      {/* This is going to have to change (i think? Not sure how to implement forms yet) */}
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
