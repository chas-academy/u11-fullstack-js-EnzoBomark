export interface AuthResponse {
  error?: string;
  accessToken?: string;
  user?: {
    name: string;
    email: string;
  };
}
