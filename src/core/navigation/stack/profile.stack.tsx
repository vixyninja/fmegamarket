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
    animation: "slide_from_bottom",
    animationDuration: 600,
    navigationBarHidden: true,
    animationTypeForReplace: "pop",
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} id="PROFILE_STACK">
      <Stack.Screen name="PROFILE_SCREEN" component={ProfileScreen as any} />
      <Stack.Screen name="SETTING_SCREEN" component={SettingScreen as any} />
    </Stack.Navigator>
  );
}
