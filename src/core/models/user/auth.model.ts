import { IToken } from "./token.model";
import { IUser } from "./user.model";

export interface ISignInGoogleCredential {
  idToken: string;
  accessToken: string;
  deviceToken: string;
  deviceType: string;
}

export interface ISignInNormalCredential {
  email: string;
  password: string;
  deviceToken: string;
  deviceType: string;
}

export interface ISignUpNormalCredential {
  email: string;
  password: string;
  confirmPassword: string;
  deviceToken: string;
  deviceType: string;
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  user: IUser;
  accessToken: IToken["accessToken"];
  refreshToken: IToken["refreshToken"];
}
