import { createContext, useState } from "react";
import { Slug } from "../types/slug";
import { exampleUserA } from "../utils/inboxtestdata";

export type UserContextType = {
  slug?: Slug;
  setSlug: (slug: Slug | undefined) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Slug | undefined>(exampleUserA);

  return <UserContext.Provider value={{ slug: user, setSlug: setUser }}>{children}</UserContext.Provider>;
};
