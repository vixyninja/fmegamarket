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
    animation: "slide_from_bottom",
    animationDuration: 600,
    navigationBarHidden: true,
    animationTypeForReplace: "pop",
    headerTitleAlign: "center",
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} id="HOME_STACK">
      <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Stack.Screen
        name="NOTIFICATION_SCREEN"
        component={NotificationScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
