import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType } from "../../components/UserContext";
import { Button } from "../../components/button/Button";
import { LoadingIndicator } from "../../components/loadingIndicator/loadingIndicator";
import { PersonCard } from "../../components/personCard/PersonCard";

export const ProfilePage: React.FC = () => {
  const { slug, setSlug } = useContext(UserContext) as UserContextType;

  return (
    <div id="profilePageWrapper">
      <h1>Your Profile</h1>
      {slug ? <PersonCard person={slug} /> : <LoadingIndicator />}
      <Link to="/faq">
        <Button
          className="action"
          text="Sign out"
          onClick={() => {
            setSlug(undefined);
          }}
        />
      </Link>
    </div>
  );
};
