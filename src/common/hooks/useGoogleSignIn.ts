import { GoogleSignin, User } from "@react-native-google-signin/google-signin";

export const useGoogleSignin = () => {
  async function signIn(): Promise<User | any> {
    try {
      await GoogleSignin.hasPlayServices();
      return await GoogleSignin.signIn();
    } catch (error: any) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      throw error;
    }
  }

  async function isSignedIn() {
    try {
      return await GoogleSignin.isSignedIn();
    } catch (error) {
      throw error;
    }
  }

  async function getTokens() {
    try {
      return await GoogleSignin.getTokens();
    } catch (error) {
      throw error;
    }
  }

  async function getCurrentUser() {
    try {
      return await GoogleSignin.getCurrentUser();
    } catch (error) {
      throw error;
    }
  }

  async function revokeAccess() {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      throw error;
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
