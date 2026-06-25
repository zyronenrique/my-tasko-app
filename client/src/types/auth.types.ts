export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface me {
  userId: number;
  name: string;
  email: string;
}

export interface User {
  user: me;
}
