import { useEffect, useState } from "react";
import { userApi } from "../../hooks/userApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = userApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");

      if (storageData) {
        const data = await api.validateToken(storageData);

        if (data.user) {
          setUser(data.user);
        }
      }
    };
    validateToken();
  }, [api]);

  const signIn = async (email: string, password: string) => {
    const data = await api.signIn(email, password);

    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }

    return false;
  };

  const signOut = async () => {
    await api.signOut();
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const setToken = async (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
