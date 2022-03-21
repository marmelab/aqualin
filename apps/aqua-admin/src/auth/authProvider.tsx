import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // authentication
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const request = new Request("https://admin.aqualin.fr.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      localStorage.setItem("auth", JSON.stringify(auth));
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
      localStorage.removeItem("auth");
      return Promise.reject({ redirectTo: "/credentials-required" });
    }
    return Promise.resolve();
  },

  checkAuth: (params) =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),

  logout: async () => {
    // clear httpOnly cookie
    const request = new Request("https://admin.aqualin.fr.com/logout", {
      method: "POST",
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      localStorage.removeItem("auth");
    } catch {
      throw new Error("Network error");
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    try {
      const { id, username, avatar } = JSON.parse(localStorage.getItem("auth"));
      return Promise.resolve({ id, username, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // authorization
  getPermissions: async () => "admin",
};
