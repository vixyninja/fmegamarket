import { BottomParamList, ProfileGroupParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "PROFILE">,
  StackScreenProps<ProfileGroupParamList>
>;

export default function SettingScreen({ navigation, route }: Props) {
  console.log(route.name, route.params);
  return (
    <View>
      <Text>SettingScreen</Text>
    </View>
  );
}
