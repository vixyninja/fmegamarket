import { IMAGE_MANAGER } from "@/assets";
import { BaseRootView } from "@/common";
import { SYSTEM_CONSTANTS } from "@/configuration";
import { NavigationServices } from "@/core/navigation/services.navigation";
import { Image, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { OnBoardingScreenKeys } from "../";
import useStyles from "./styles";

export default function WelcomeScreen() {
  const styles = useStyles();
  const opacity = useSharedValue(0);
  const animatedY = useSharedValue(-200);
  const repeatXY = useSharedValue(0);
  const { t } = useTranslation();

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    animatedY.value = withTiming(0, { duration: 2000 });
    repeatXY.value = withRepeat(withTiming(20, { duration: 1000 }), -1, true);
    return () => {
      opacity.value = withTiming(0, { duration: 1000 });
      animatedY.value = withTiming(-200, { duration: 2000 });
      repeatXY.value = withRepeat(withTiming(0, { duration: 1000 }), -1, true);
    };
  }, []);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: animatedY.value }],
    };
  });

  const nextButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: repeatXY.value }],
    };
  });

  function handleNext() {
    NavigationServices.navigate(OnBoardingScreenKeys.Introduction);
  }

  return (
    <BaseRootView>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />

      <Image
        source={{ uri: SYSTEM_CONSTANTS.ON_BOARDING_IMAGE[0] }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
        defaultSource={IMAGE_MANAGER.placeholder}
        transitionDuration={500}
        transition={true}
        fadeDuration={500}
        children={
          <Animated.View style={[styles.textContainer, opacityStyle]}>
            <Text style={styles.text1}>{t("welcome.welcome")}</Text>
            <Text style={styles.text2}>Mega Market</Text>
            <Text style={styles.text3}>{t("welcome.text")}</Text>
          </Animated.View>
        }
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Animated.Text style={[styles.nextText, nextButtonStyle]}>
          {t("welcome.next")} &gt;
        </Animated.Text>
      </TouchableOpacity>
    </BaseRootView>
  );
}
