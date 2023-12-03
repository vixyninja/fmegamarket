import { HomeScreen, NotificationScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { HomeGroupParamList } from "../types.navigation";

export function HomeStack() {
  const Stack = createNativeStackNavigator<HomeGroupParamList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_right",
    animationDuration: 300,
  };

  return (
    <Stack.Group screenOptions={screenOptions} navigationKey="HOME_STACK">
      <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Stack.Screen name="NOTIFICATION_SCREEN" component={NotificationScreen} />
    </Stack.Group>
  );
}
