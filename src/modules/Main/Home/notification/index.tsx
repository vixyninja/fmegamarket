import { AppParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

type Props = NativeStackScreenProps<AppParamList, "NOTIFICATION_SCREEN">;

export default function NotificationScreen({ navigation, route }: Props) {
  console.log(route.name, route.params);

  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
}
