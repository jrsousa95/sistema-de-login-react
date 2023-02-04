import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const userApi = () => ({
  validateToken: async (token: string) => {
    const { data: validateToken } = await api.post("/validate-token", {
      token,
    });

    return validateToken;
  },

  signIn: async (email: string, password: string) => {
    const { data: signIn } = await api.post("/sign-in", { email, password });

    return signIn;
  },

  signOut: async () => {
    const { data: signOut } = await api.post("/sign-out");

    return signOut;
  },
});
