import { ProfileScreen, SettingScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ProfileGroupParamList } from "../types.navigation";

export function ProfileStack() {
  const Stack = createNativeStackNavigator<ProfileGroupParamList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_right",
    animationDuration: 300,
  };

  return (
    <Stack.Group screenOptions={screenOptions} navigationKey="PROFILE_STACK">
      <Stack.Screen name="PROFILE_SCREEN" component={ProfileScreen} />
      <Stack.Screen name="SETTING_SCREEN" component={SettingScreen} />
    </Stack.Group>
  );
}
