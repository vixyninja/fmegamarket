import { AppParamList, BottomParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "EXPLORE">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function ExploreScreen({ navigation, route }: Props) {
  console.log(route.name);
  return (
    <View>
      <Text>ExploreScreen</Text>
      <Button
        title={"Navigation to search"}
        onPress={() =>
          navigation.navigate("BOTTOM_TAB", {
            screen: "PROFILE",
          })
        }
      />
    </View>
  );
}
