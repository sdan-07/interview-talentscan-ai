import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../types/user.types";
import { login, register, logout } from "../services/api/auth.service";
import { getme } from "../services/api/auth.service";

type LoginCredentials = {
  email: string;
  password: string;
};
type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

interface AuthResponse {
  user?: User;
}

interface useAuthReturn {
  user: User | null;
  loading: boolean;
  handleRegister: (user: RegisterCredentials) => Promise<User | null>;
  handleLogin: (user: LoginCredentials) => Promise<User | null>;
  handleLogout: () => Promise<void>;
}

export const useAuth = (): useAuthReturn => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("Auth variables must be provided within AuthContext");

  const { loading, setLoading, user, setUser } = context;

  const handleRegister = async ({
    username,
    email,
    password,
  }: RegisterCredentials): Promise<User | null> => {
    setLoading(true);

    try {
      const data = (await register({
        username,
        email,
        password,
      })) as AuthResponse | undefined;

      if (!data?.user) {
        setUser(null);
        return null;
      }

      setUser(data.user);
      return data.user;

    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({
    email,
    password,
  }: LoginCredentials): Promise<User | null> => {
    setLoading(true);

    try {
      const data = (await login({
        email,
        password,
      })) as AuthResponse | undefined;

      console.log(data);

      if (!data?.user) {
        setUser(null);
        return null;
      }

      setUser(data.user);
      
      return data.user;

    } catch (e) {
      console.error(e);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  //if user logged in, won't show login page
  useEffect(() => {
    const getMeAndSetUser = async (): Promise<void> => {
      try {
        const data = await getme();
        setUser(data?.user ?? null);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getMeAndSetUser();
  }, []);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
