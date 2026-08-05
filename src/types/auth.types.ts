export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SignupResponse {
  user: User;
}

export interface MeResponse {
  user: User;
}
