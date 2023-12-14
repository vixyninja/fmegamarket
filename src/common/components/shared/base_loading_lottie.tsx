import { ANIMS_MANAGER } from "@/assets";
import { useAppSelector } from "@/common/hooks";
import { loadingSelector } from "@/core";
import { Text } from "@rneui/themed";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ControllingAnimationProgress() {
  const loading = useAppSelector(loadingSelector);

  if (!loading.loading) {
    return <View />;
  }

  return (
    <View style={styles.root}>
      <LottieView
        source={ANIMS_MANAGER.loading}
        autoPlay
        loop
        style={styles.container}
        cacheComposition={true}
        speed={0.7}
        useNativeLooping={true}
      />
      {loading?.title !== "" && (
        <Text style={styles.text}>{loading?.title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    zIndex: 999,
    width: 50,
    height: 50,
  },
  text: {
    color: "white",
    marginTop: 6,
    fontSize: 16,
  },
});
