import { useContext } from "react";
import { Link } from "react-router-dom";
import { Size } from "../../types/size";
import { UserContext, UserContextType } from "../UserContext";
import { Button } from "../button/Button";
import { Hero } from "../hero/Hero";

export const Nav: React.FC = () => {
  const { slug } = useContext(UserContext) as UserContextType;

  return (
    <nav>
      <Hero size={Size.Small} redirectToHome={true} />
      <div className="nav-buttons">
        <Link to="/faq">
          <Button className="secondary" text="FAQ" />
        </Link>
        {slug && (
          <>
            <Link to="/listing">
              <Button className="secondary" text="Listing" />
            </Link>
            <Link to="/inbox">
              <Button className="secondary" text="Chats" />
            </Link>
            <Link to="/saved-places">
              <Button className="secondary" text="Saved" />
            </Link>
            <Link to="/profile">
              <Button className="action" text="Profile" />
            </Link>
          </>
        )}
        {!slug && (
          <>
            <Link to="/login">
              <Button className="action" text="Login" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
