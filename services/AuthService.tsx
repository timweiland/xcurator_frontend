import axios from "axios";
import create from "zustand";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_BASE + process.env.NEXT_PUBLIC_USER_AUTH_PATH;

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface TokenResponse {
  access: string;
  access_expires: number;
}

const makeUrl = (endpoint: string): string => {
  return API_BASE + endpoint;
};

const fetchToken = (username: string, password: string): Promise<Response> => {
  const url = makeUrl("/login/");
  return axios
    .post(
      url,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      if (error.response) {
        if (error.response.data && error.response.data.detail) {
          throw new Error(error.response.data.detail);
        }
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error("Could not reach server.");
      } else {
        throw new Error(error.message);
      }
    });
};

const fetchNewToken = (): Promise<Response> => {
  const url = makeUrl("/refresh/");
  return axios
    .post(
      url,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      if (error.response) {
        if (error.response.data && error.response.data.detail) {
          throw new Error(error.response.data.detail);
        }
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error("Could not reach server.");
      } else {
        throw new Error(error.message);
      }
    });
};

async function fetchUser(token: string): Promise<Response> {
  const url = makeUrl("/profile/");
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useAuth = create((set, get) => ({
  isLoading: true,
  isAuthenticated: false,
  user: null,
  accessToken: "",
  accessTokenExpiry: null,
  setNotAuthenticated: () => {
    set({ isAuthenticated: false, isLoading: false, user: null });
  },
  accessTokenIsValid: () => {
    const { accessToken, accessTokenExpiry, ...rest } = get();
    if (accessToken === "") {
      return false;
    }
    const expiry = new Date(accessTokenExpiry);
    return expiry.getTime() > Date.now();
  },
  initAuth: async (): Promise<void> => {
    set({ isLoading: true });
    if (!get().accessTokenIsValid()) {
      await get().refreshToken();
    } else {
      set({ isAuthenticated: true, loading: false });
      get().initUser();
    }
  },
  hydrate: () => {
    get().initAuth();
  },
  initUser: async (token: string): Promise<void> => {
    try {
      const resp = await fetchUser(token);
      const user = resp.data;
      set({ user: user });
    } catch (error) {
      // TODO
      console.log(`An error occured when initting the user ${error}`);
    }
  },
  refreshToken: async (): Promise<string> => {
    set({ isLoading: true });
    let resp;
    try {
      resp = await fetchNewToken();
    } catch (error) {
      console.log(`Error on refreshing token. ${error}`);
      get().setNotAuthenticated();
      return;
    }

    const tokenData = resp.data;
    get().handleNewToken(tokenData);
    if (get().user === null) {
      await get().initUser(tokenData.access);
    }
    return tokenData.access;
  },
  handleNewToken: (data: TokenResponse): void => {
    const expiryInt = data.access_expires * 1000;
    set({
      accessToken: data.access,
      accessTokenExpiry: expiryInt,
      isAuthenticated: true,
      isLoading: false,
    });
  },
  login: async (username: string, password: string): Promise<void> => {
    try {
      const resp = await fetchToken(username, password);
      const tokenData = resp.data;
      get().handleNewToken(tokenData);
      await get().initUser(tokenData.access);
    } catch (error) {
      set({ isAuthenticated: false, isLoading: true });
      throw error;
    }
  },
  getToken: async (): Promise<string> => {
    // Returns an access token if there's one or refetches a new one
    if (get().accessTokenIsValid()) {
      return Promise.resolve(get().accessToken);
    } else if (get().isLoading) {
      while (get().isLoading) {
        console.log("Getting access token.. waiting for token to be refreshed");
      }
      // Assume this means the token is in the middle of refreshing
      return Promise.resolve(get().accessToken);
    } else {
      console.log("Getting access token.. getting a new token");
      const token = await get().refreshToken();
      return token;
    }
  },
  logout: (): void => {
    const url = makeUrl("/logout/");
    axios
      .post(
        url,
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {})
      .catch((error) => {
        console.log("Error on logout: ${error}");
      })
      .then(() => {
        console.log("Logged out");
        set({ accessToken: "", accessTokenExpiry: null });
        get().setNotAuthenticated();
      });
  },
}));
