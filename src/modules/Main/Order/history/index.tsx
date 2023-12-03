import { AppParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<AppParamList, "HISTORY_SCREEN">;

export default function HistoryScreen({ navigation, route }: Props) {
  console.log(route.name);
  return (
    <View>
      <Text>OrderScreen</Text>
    </View>
  );
}
