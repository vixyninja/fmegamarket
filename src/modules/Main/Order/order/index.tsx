import { AppParamList, BottomParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "ORDER">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function OrderScreen({ navigation, route }: Props) {
  console.log(" LOG O DAY ", route.params?.userId);
  return (
    <View>
      <Text>OrderScreen</Text>
    </View>
  );
}
