import { ScreenType } from "@/core";
import SignInScreen from "./sign-in";
import SignUpScreen from "./sign-up";

export { default as SignInScreen } from "./sign-in";
export { default as SignUpScreen } from "./sign-up";

export const authScreens = [SignInScreen, SignUpScreen];

export enum AuthScreenKeys {
  SignIn = "SignIn",
  SignUp = "SignUp",
}

export const authScreenStack: Array<ScreenType> = [
  {
    name: AuthScreenKeys.SignIn,
    component: SignInScreen,
  },
  {
    name: AuthScreenKeys.SignUp,
    component: SignUpScreen,
  },
];
