import { create } from "zustand";
import Cookies from "js-cookie";
import { authService } from "@/services/auth.service";
import type { LoginPayload, SignupPayload, User } from "@/types/auth.types";

const TOKEN_COOKIE = "warm_token";
const COOKIE_EXPIRES_DAYS = 1; // matches backend JWT_EXPIRES_IN default (1d)

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrating: boolean; // true while we're checking cookie on app load
  isSubmitting: boolean; // true during login/signup requests
  error: string | null;

  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
  hydrate: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrating: true,
  isSubmitting: false,
  error: null,

  login: async (payload) => {
    set({ isSubmitting: true, error: null });
    try {
      const { user, token } = await authService.login(payload);
      Cookies.set(TOKEN_COOKIE, token, {
        expires: COOKIE_EXPIRES_DAYS,
        sameSite: "strict",
        secure: import.meta.env.PROD,
      });
      set({ user, isAuthenticated: true, isSubmitting: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ isSubmitting: false, error: message });
      throw err;
    }
  },

  signup: async (payload) => {
    set({ isSubmitting: true, error: null });
    try {
      await authService.signup(payload);
      set({ isSubmitting: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      set({ isSubmitting: false, error: message });
      throw err;
    }
  },

  logout: () => {
    Cookies.remove(TOKEN_COOKIE);
    set({ user: null, isAuthenticated: false });
  },

  hydrate: async () => {
    const token = Cookies.get(TOKEN_COOKIE);
    if (!token) {
      set({ isHydrating: false });
      return;
    }
    try {
      const { user } = await authService.getCurrentUser();
      set({ user, isAuthenticated: true, isHydrating: false });
    } catch {
      // token invalid/expired — clean slate
      Cookies.remove(TOKEN_COOKIE);
      set({ user: null, isAuthenticated: false, isHydrating: false });
    }
  },

  clearError: () => set({ error: null }),
}));
