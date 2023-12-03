import { AppParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<AppParamList, "SEARCH_SCREEN">;
export default function SearchScreen({ navigation, route }: Props) {
  console.log(route.name);

  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
}
