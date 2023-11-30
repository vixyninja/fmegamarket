export interface CredentialSignIn {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceToken?: string;
  deviceType?: string;
}

export interface CredentialSignUp extends Omit<CredentialSignIn, "rememberMe"> {
  confirmPassword: string;
}

export interface CredentialToken {
  accessToken: string;
  refreshToken: string;
}
