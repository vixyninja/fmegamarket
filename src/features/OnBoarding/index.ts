import { ScreenType } from "@navigation/types.navigation";
import IntroductionScreen from "./introduction";
import WelcomeScreen from "./welcome";
import LobbyScreen from "./lobby";

export { default as IntroductionScreen } from "./introduction";
export { default as WelcomeScreen } from "./welcome";
export { default as LobbyScreen } from "./lobby";

export const onBoardingScreens = [WelcomeScreen, IntroductionScreen];

export enum OnBoardingScreenKeys {
  Welcome = "Welcome",
  Introduction = "Introduction",
  Lobby = "Lobby",
}
export const onBoardingScreenStack: Array<ScreenType> = [
  {
    name: OnBoardingScreenKeys.Welcome,
    component: WelcomeScreen,
  },
  {
    name: OnBoardingScreenKeys.Introduction,
    component: IntroductionScreen,
  },
  {
    name: OnBoardingScreenKeys.Lobby,
    component: LobbyScreen,
  },
];
