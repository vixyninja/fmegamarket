import { GoogleSignin, User } from "@react-native-google-signin/google-signin";

export const useGoogleSignin = () => {
  async function signIn(): Promise<User | any> {
    try {
      await GoogleSignin.hasPlayServices();
      return await GoogleSignin.signIn();
    } catch (error: any) {
      throw new Error("Sign in failed");
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      throw new Error("Sign out failed");
    }
  }

  async function isSignedIn() {
    try {
      return await GoogleSignin.isSignedIn();
    } catch (error) {
      throw new Error("Sign in failed");
    }
  }

  async function getTokens() {
    try {
      return await GoogleSignin.getTokens();
    } catch (error) {
      throw new Error("Get tokens failed");
    }
  }

  async function getCurrentUser() {
    try {
      return await GoogleSignin.getCurrentUser();
    } catch (error) {
      throw new Error("Get current user failed");
    }
  }

  async function revokeAccess() {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      throw new Error("Revoke access failed");
    }
  }

  return {
    signIn,
    signOut,
    isSignedIn,
    getTokens,
    getCurrentUser,
    revokeAccess,
  };
};
