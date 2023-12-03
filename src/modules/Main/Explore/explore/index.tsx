import { BottomParamList, ExploreGroupParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "EXPLORE">,
  StackScreenProps<ExploreGroupParamList, "EXPLORE_SCREEN">
>;

export default function ExploreScreen({ navigation, route }: Props) {
  console.log(route.name);
  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  );
}
