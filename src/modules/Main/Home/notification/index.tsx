import { ANIMS_MANAGER } from "@/assets";
import { useLayoutAnimation } from "@/common";
import { HomeGroupParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeGroupParamList, "NOTIFICATION_SCREEN">,
  StackScreenProps<HomeGroupParamList>
>;

export default function NotificationScreen({ navigation, route }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);
  console.log(route.name, route.params);

  return (
    <View>
      <Text>NotificationScreen</Text>
    </View>
  );
}
