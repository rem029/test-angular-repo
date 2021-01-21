export interface LogInAuthModel {
  toggleShowPassword: boolean;
  isLoggedIn: boolean;
  isLoggedInError: boolean;
  token: string;
  lastCode: number;
}
