import { ScreenType } from "@navigation/types.navigation";
import IntroductionScreen from "./introduction";
import WelcomeScreen from "./welcome";

export { default as IntroductionScreen } from "./introduction";
export { default as WelcomeScreen } from "./welcome";

export const onBoardingScreens = [WelcomeScreen, IntroductionScreen];

export enum OnBoardingScreenKeys {
  Welcome = "Welcome",
  Introduction = "Introduction",
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
];
