import { Size } from "../../types/size";
import { Hero } from "../hero/Hero";

export const Nav: React.FC = () => {
  return (
    <nav>
      <Hero size={Size.Small} redirectToHome={true} />
    </nav>
  );
};
