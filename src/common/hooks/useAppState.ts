import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

const isForeground = (appState: AppStateStatus): boolean => appState === "active";

type AppStateType = {
  appIsInForeground: boolean;
};

export const useAppState = (): AppStateType => {
  const [appState, setAppState] = useState(isForeground(AppState.currentState));

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const newValues = isForeground(nextAppState);
      setAppState(newValues);
    });

    return () => subscription.remove();
  }, []);

  return { appIsInForeground: appState };
};
