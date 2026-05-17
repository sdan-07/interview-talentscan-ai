//creating the global variables for every component to access (react context)

import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/user.types";
import type { AuthContextType } from "../types/user.types";

interface AuthContextProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextProps): ReactNode => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
