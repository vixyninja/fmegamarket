import lodash from "lodash";
import { isEmail, isPassword } from "./strings.util";

export function validateSignInNormal(email: string, password: string) {
  if (lodash.isEmpty(email)) {
    throw new Error("Email is required");
  }

  if (!isEmail(email)) {
    throw new Error("Email is invalid");
  }

  if (lodash.isEmpty(password)) {
    throw new Error("Password is required");
  }

  if (!isPassword(password)) {
    throw new Error("Password is invalid");
  }

  return true;
}

export const validateSignUpNormal = (
  email: string,
  password: string,
  confirmPassword: string,
) => {};
