import { HistoryScreen, OrderScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { OrderGroupParamList } from "../types.navigation";

export function OrderStack() {
  const Stack = createNativeStackNavigator<OrderGroupParamList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_bottom",
    animationDuration: 600,
    navigationBarHidden: true,
    animationTypeForReplace: "pop",
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} id="PROFILE_STACK">
      <Stack.Screen name="ORDER_SCREEN" component={OrderScreen} />
      <Stack.Screen name="HISTORY_SCREEN" component={HistoryScreen} />
    </Stack.Navigator>
  );
}
