import { api } from "../lib/api-client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth.types";

export async function login(
  data: LoginRequest
) {
  return api<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function register(
  data: RegisterRequest
) {
  return api<AuthResponse>("/api/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function me() {
  return api("/api/auth/me");
}

export async function logout() {
  return api("/api/auth/logout",
    {
      method: "POST",
    }
  );
}

export function refresh(
  refreshToken: string
) {
  return api<AuthResponse>("/api/auth/refresh",
    {
      method: "POST", 
      body: JSON.stringify({
        refreshToken,
      }),
    }
  );
}
