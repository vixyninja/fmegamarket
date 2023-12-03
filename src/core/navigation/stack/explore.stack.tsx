import { ExploreScreen, SearchScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ExploreGroupParamList } from "../types.navigation";

export function ExploreStack() {
  const Stack = createNativeStackNavigator<ExploreGroupParamList>();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_right",
    animationDuration: 300,
  };

  return (
    <Stack.Group screenOptions={screenOptions} navigationKey="EXPLORE_STACK">
      <Stack.Screen name="EXPLORE_SCREEN" component={ExploreScreen} />
      <Stack.Screen name="SEARCH_SCREEN" component={SearchScreen} />
    </Stack.Group>
  );
}
