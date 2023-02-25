import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const userApi = () => ({
  validateToken: async (token: string) => {
    return {
      user: { id: 1, name: "Junior", email: "juniorsousa_343@hotmail.com" },
    };

    // eslint-disable-next-line no-unreachable
    const { data: validateToken } = await api.post("/validate-token", {
      token,
    });

    return validateToken;
  },

  signIn: async (email: string, password: string) => {
    return {
      user: { id: 1, name: "Junior", email: "juniorsousa_343@hotmail.com" },
      token: "sdfaSDFA2S1DF5S4DF51SDF1241SA2F",
    };

    // eslint-disable-next-line no-unreachable
    const { data: signIn } = await api.post("/sign-in", { email, password });

    return signIn;
  },

  signOut: async () => {
    return { status: true };

    // eslint-disable-next-line no-unreachable
    const { data: signOut } = await api.post("/sign-out");

    return signOut;
  },
});
