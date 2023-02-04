import { useState } from "react";
import { userApi } from "../../hooks/userApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);

  const api = userApi();

  const signIn = async (email: string, password: string) => {
    const data = await api.signIn(email, password);

    if (data.user && data.token) {
      setUser(data.user);

      return true;
    }

    return false;
  };

  const signOut = () => {};

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
