import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const { params } = useRoute();

  useEffect(() => {
    console.log("params", params);
  }, [params]);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
}
