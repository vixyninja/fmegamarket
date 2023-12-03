const AuthScreenKeys = {
  SIGN_IN_SCREEN: "SIGN_IN_SCREEN",
  SIGN_UP_SCREEN: "SIGN_UP_SCREEN",
} as const;

export { AuthScreenKeys };

export { default as SignInScreen } from "./sign-in";

export { default as SignUpScreen } from "./sign-up";
