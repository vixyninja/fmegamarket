import { CartGroupParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<CartGroupParamList, "WISHLIST_SCREEN">,
  StackScreenProps<CartGroupParamList>
>;

export default function WishListScreen({ navigation, route }: Props) {
  console.log(route.name);

  return (
    <View>
      <Text>WishListScreen</Text>
    </View>
  );
}
