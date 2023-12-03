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
      <Stack.Screen name="CART_SCREEN" component={CartScreen as any} />
      <Stack.Screen name="WISHLIST_SCREEN" component={WishListScreen as any} />
    </Stack.Navigator>
  );
}
