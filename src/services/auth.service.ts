// src/services/auth.service.ts
import api from "@/lib/axios";
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
  MeResponse,
} from "@/types/auth.types";

interface APIResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await api.post<APIResponse<LoginResponse>>(
      "/auth/login",
      payload,
    );
    if (!data.data) throw new Error(data.message || "Login failed");
    return data.data;
  },

  async signup(payload: SignupPayload): Promise<SignupResponse> {
    const { data } = await api.post<APIResponse<SignupResponse>>(
      "/auth/signup",
      payload,
    );
    if (!data.data) throw new Error(data.message || "Signup failed");
    return data.data;
  },

  async getCurrentUser(): Promise<MeResponse> {
    const { data } = await api.get<APIResponse<MeResponse>>("/users/me");
    if (!data.data) throw new Error(data.message || "Failed to fetch user");
    return data.data;
  },
};