import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  isAdmin: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  isAdmin: () => {
    const roles = get().user?.roles || [];

    return roles.includes("admin");
  },

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      localStorage.removeItem("token");
      return false;
    }
  },
  logout: () => {
    set({ user: null, token: null, authStatus: "not-authenticated" });
    localStorage.removeItem("token");
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user: user, token: token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
    }
    return false;
  },

  register: async (fullName: string, email: string, password: string) => {
    try {
      const data = await registerAction(fullName, email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      localStorage.removeItem("token");
      return false;
    }
  },
}));
