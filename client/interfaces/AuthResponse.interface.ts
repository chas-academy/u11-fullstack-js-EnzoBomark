export interface AuthResponse {
  error?: string;
  success?: { accessToken: string; refreshToken: string };
}
