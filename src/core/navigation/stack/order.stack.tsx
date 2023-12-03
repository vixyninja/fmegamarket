import { HistoryScreen, OrderScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { OrdersGroupParamList } from "../types.navigation";

export function OrderStack() {
  const Stack = createNativeStackNavigator<OrdersGroupParamList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_right",
    animationDuration: 300,
  };

  return (
    <Stack.Group screenOptions={screenOptions} navigationKey="ORDER_STACK">
      <Stack.Screen name="ORDER_SCREEN" component={OrderScreen} />
      <Stack.Screen name="HISTORY_SCREEN" component={HistoryScreen} />
    </Stack.Group>
  );
}
