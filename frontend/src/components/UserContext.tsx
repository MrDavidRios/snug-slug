import { createContext, useState } from "react";
import { Slug } from "../types/slug";

export type UserContextType = {
  slug?: Slug;
  setSlug: (slug: Slug) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Slug | undefined>(undefined);

  return <UserContext.Provider value={{ slug: user, setSlug: setUser }}>{children}</UserContext.Provider>;
};
