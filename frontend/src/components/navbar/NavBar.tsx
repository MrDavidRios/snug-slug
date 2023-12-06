import { Link } from "react-router-dom";
import { Size } from "../../types/size";
import { Button } from "../button/Button";
import { Hero } from "../hero/Hero";

export const Nav: React.FC = () => {
  return (
    <nav>
      <Hero size={Size.Small} redirectToHome={true} />
      <div className="nav-buttons">
        <Button className="secondary" text="FAQ" onClick={() => {}} />
        <Button className="secondary" text="Listing" onClick={() => {}} />
        <Button className="secondary" text="Chats" onClick={() => {}} />
        <Link to="/saved-places">
          <Button className="secondary" text="Saved" onClick={() => {}} />
        </Link>
        <Button className="action" text="Profile" onClick={() => {}} />
      </div>
    </nav>
  );
};
