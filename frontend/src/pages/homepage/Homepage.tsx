import { Input } from "../../components/input/Input";
import { useHistory } from "react-router-dom";

export const Homepage: React.FC = () => {
  const history = useHistory();

  const handleSearch = (query: string) => {
    history.push(`/results/${query}`);
  };

  return <Input onSend={handleSearch} placeholder="Search..." />;
};
