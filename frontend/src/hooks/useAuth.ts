import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../types/user.types";
import { login, register, logout } from "../services/api/auth.service";
import { getme } from "../services/api/auth.service";

type LoginCredentials = Pick<User, "email" | "password">;
// type RegisterCredentials = Pick<User, "username" | "email" | "password">;

interface AuthResponse {
  user: User | null;
}

interface useAuthReturn {
  user: User | null;
  loading: boolean;
  handleRegister: (user: User) => Promise<void>;
  handleLogin: (user: LoginCredentials) => Promise<void>;
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
  }: User): Promise<void> => {
    setLoading(true);

    try {
      const data = (await register({
        username,
        email,
        password,
      })) as unknown as AuthResponse;
      setUser(data.user);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({
    email,
    password,
  }: LoginCredentials): Promise<void> => {
    setLoading(true);

    try {
      const data = (await login({
        email,
        password,
      })) as unknown as AuthResponse;
      console.log(data);

      setUser(data.user);
    } catch (e) {
      console.error(e);
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
