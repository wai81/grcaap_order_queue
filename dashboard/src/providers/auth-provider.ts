import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  getIdentity: async () => {
        const response = await fetch("https://api.fake-rest.refine.dev/auth/me", {
            headers: {
            Authorization: localStorage.getItem("my_access_token"),
            },
        });

        if (response.status < 200 || response.status > 299) {
            return null;
        }

        const data = await response.json();

        return data;
        },  
  check: async () => {
    // When logging in, we'll obtain an access token from our API and store it in the local storage.
    // Now let's check if the token exists in the local storage.
    // In the later steps, we'll be implementing the `login` and `logout` methods.
    const token = localStorage.getItem("my_access_token");

    return { authenticated: Boolean(token) };
  },
  login: async ({ email, password }) => {
    const response = await fetch(
        "https://api.fake-rest.refine.dev/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem("my_access_token", data.token);
        return { success: true };
      }
  
      return { success: false };
  },
  logout: async () => {
    localStorage.removeItem("my_access_token");
    // We're returning success: true to indicate that the logout operation was successful.
    return { success: true };
  },
  onError: async (error) => {
    throw new Error("Not implemented");
  },
  // ...
};