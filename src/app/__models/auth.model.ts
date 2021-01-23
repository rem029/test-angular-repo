export interface AuthModel {
  toggleShowPassword: boolean;
  isLoggedIn: boolean;
  isLoggedInError: boolean;
  isLoading: boolean;
  token: string;
  lastCode: number;
}
