import { ANIMS_MANAGER } from "@/assets";
import { BaseRootView, useLayoutAnimation } from "@/common";
import { AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheet, Button, Text } from "@rneui/themed";
import LottieView from "lottie-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useStyles from "./styles";

type Props = NativeStackScreenProps<AuthParamList, "WELCOME_SCREEN">;

export default function WelcomeScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);
  const styles = useStyles();
  const { t } = useTranslation();
  function onPressNext() {
    navigation.replace("INTRODUCTION_SCREEN");
  }
  return (
    <BaseRootView>
      <LottieView
        source={ANIMS_MANAGER.welcome}
        style={styles.image}
        autoPlay
        cacheComposition
        loop
        useNativeLooping
        resizeMode="cover"
        renderMode="AUTOMATIC"
        speed={0.5}
      />

      <BottomSheet
        isVisible
        containerStyle={styles.bottomSheetContainer}
        backdropStyle={styles.bottomSheetBackdrop}
        children={
          <View style={styles.containerChildren}>
            <Text h2>{t("welcome.welcome")}</Text>
            <Text h1>Mega Market</Text>
            <Text h4>{t("welcome.text")}</Text>
            <Button
              title={t("welcome.next")}
              raised
              containerStyle={styles.nextButtonContainer}
              onPress={onPressNext}
            />
          </View>
        }
      />
    </BaseRootView>
  );
}
