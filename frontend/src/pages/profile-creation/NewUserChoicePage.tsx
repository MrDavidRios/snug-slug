import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";

export const NewUserChoicePage: React.FC = () => {
  return (
    <div id="newUserChoicePageWrapper">
      <h1>Let's get started!</h1>
      <p>Would you like to:</p>
      <Link to="/">
        <Button text="Find an apartment" className="action" />
      </Link>
      <Link to="/listing-creation">
        <Button text="Make a listing" className="action" />
      </Link>
    </div>
  );
};
