import { AuthProvider } from "react-admin";

const AUTHENTICATION_KEY = "auth";

export const authProvider: AuthProvider = {
  // authentication
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        "https://admin.aqualin.fr.com/authenticate",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: new Headers({ "Content-Type": "application/json" }),
        },
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(auth));
    } catch {
      throw new Error("Network error");
    }
  },

  checkError: ({
    message,
    status,
    body,
  }: {
    message: string;
    status: number;
    body: Object;
  }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem(AUTHENTICATION_KEY);
      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },

  checkAuth: (params) =>
    localStorage.getItem(AUTHENTICATION_KEY)
      ? Promise.resolve()
      : Promise.reject(),

  logout: async () => {
    try {
      // clear httpOnly cookie

      const response = await fetch("https://admin.aqualin.fr.com/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      localStorage.removeItem(AUTHENTICATION_KEY);
    } catch {
      throw new Error("Network error");
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const auth = localStorage.getItem(AUTHENTICATION_KEY);
    if (!auth) {
      return Promise.reject("User not logger in");
    }
    try {
      const { id, username, avatar } = JSON.parse(auth);
      return Promise.resolve({ id, username, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // authorization
  getPermissions: async () => "admin",
};
