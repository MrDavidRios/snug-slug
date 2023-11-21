import { Outlet } from "react-router";
import { Nav } from "../components/navbar/NavBar";

export const Root: React.FC = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};
