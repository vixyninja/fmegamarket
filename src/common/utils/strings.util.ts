import { Platform } from "react-native";

export const isEmail = (email: string) => {
  const regex = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";
  return email.match(regex);
};

export const isPassword = (password: string) => {
  const regex = "^[a-zA-Z0-9]{6,}$";
  return password.match(regex);
};

export const isComparePassword = (password: string, confirmPassword: string) => {
  const regex = "^[a-zA-Z0-9]{6,}$";
  return password.match(regex) && confirmPassword.match(regex) && password === confirmPassword;
};

export const isPhoneNumber = (phoneNumber: string) => {
  const regex = "^[0-9]{10}$";
  return phoneNumber.match(regex);
};

export const isNotEmpty = (value: string) => {
  return value !== "" && value !== undefined && value !== null;
};

export const isPlatForm = () => {
  return Platform.OS.toLowerCase().toString();
};
