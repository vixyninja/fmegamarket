import { AppParamList, BottomParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "CART">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function CartScreen({ navigation, route }: Props) {
  console.log(route.name);
  return (
    <View>
      <Text>CartScreen</Text>
      <Button
        onPress={() => navigation.navigate("WISHLIST_SCREEN")}
        title={"Navigation to profile"}
      />
    </View>
  );
}
