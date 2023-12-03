import { CartScreen, WishListScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { CartGroupParamList } from "../types.navigation";

export function CartStack() {
  const Stack = createNativeStackNavigator<CartGroupParamList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_bottom",
    animationDuration: 600,
    animationTypeForReplace: "pop",
    navigationBarHidden: true,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions} id="CART_STACK">
      <Stack.Screen name="CART_SCREEN" component={CartScreen} />
      <Stack.Screen name="WISHLIST_SCREEN" component={WishListScreen} />
    </Stack.Navigator>
  );
}
