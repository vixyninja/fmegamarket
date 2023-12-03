const OnBoardingScreenKeys = {
  WELCOME_SCREEN: "WELCOME_SCREEN",
  INTRODUCTION_SCREEN: "INTRODUCTION_SCREEN",
  LOBBY_SCREEN: "LOBBY_SCREEN",
} as const;

export { OnBoardingScreenKeys };

export { default as WelcomeScreen } from "./welcome";

export { default as IntroductionScreen } from "./introduction";

export { default as LobbyScreen } from "./lobby";
