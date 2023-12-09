import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import { BaseRootView, useAppDispatch, useLayoutAnimation } from "@/common";
import { dimens } from "@/configuration";
import { AppAction, AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Image } from "@rneui/themed";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StatusBar, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import useStyles from "./styles";

type Props = NativeStackScreenProps<AuthParamList, "INTRODUCTION_SCREEN">;

export default function IntroductionScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);
  const styles = useStyles();
  const scrollX = useSharedValue(0);
  const dispatch = useAppDispatch();
  const listRef = useAnimatedRef<Animated.FlatList<string>>();
  const { t } = useTranslation();
  const data = [IMAGE_MANAGER.i1, IMAGE_MANAGER.i2, IMAGE_MANAGER.i3];
  const handlerScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onPressNext = useCallback(() => {
    if (scrollX.value < dimens.width * (data.length - 1)) {
      listRef.current?.scrollToOffset({
        offset: scrollX.value + dimens.width,
        animated: true,
      });
    } else {
      listRef.current?.setNativeProps({ scrollEnabled: false });
      navigation.replace("LOBBY_SCREEN");
      dispatch(AppAction.setFirstTime(false));
    }
  }, []);

  useEffect(() => {
    Promise.all(data.map((item) => Image.prefetch(item)));
    Image.prefetch(IMAGE_MANAGER.iblur);
    return () => {};
  }, []);

  return (
    <BaseRootView>
      <StatusBar backgroundColor={"transparent"} translucent barStyle={"light-content"} />
      <BackDrop />
      <CarouselFlatList />
      <IndicatorFlatList />
      <ButtonNext />
    </BaseRootView>
  );

  function ButtonNext(): React.JSX.Element {
    return (
      <View style={styles.buttonNextContainer}>
        <Button
          onPress={onPressNext}
          title={t("introduction.next")}
          containerStyle={styles.buttonNext}
          buttonStyle={{
            backgroundColor: "transparent",
          }}
          activeOpacity={0}
          raised={false}
          TouchableComponent={TouchableWithoutFeedback}
        />
      </View>
    );
  }

  function IndicatorFlatList(): React.JSX.Element {
    return (
      <Animated.View style={styles.indicatorContainer}>
        {data.map((_, index) => {
          const inputRange = [(index - 1) * dimens.width, index * dimens.width, (index + 1) * dimens.width];
          const scaleStyle = useAnimatedStyle(() => {
            return {
              transform: [
                {
                  scale: interpolate(scrollX.value, inputRange, [0.6, 1.4, 0.6], "clamp"),
                },
              ],
            };
          });

          return <Animated.View key={index} style={[styles.indicator, scaleStyle]} />;
        })}
      </Animated.View>
    );
  }

  function BackDrop(): React.JSX.Element {
    return (
      <View style={styles.backDropContainer}>
        <Image
          source={{ uri: IMAGE_MANAGER.iblur }}
          style={styles.backDropImage}
          resizeMethod="resize"
          resizeMode="stretch"
          blurRadius={100}
        />
      </View>
    );
  }

  function CarouselFlatList(): React.JSX.Element {
    return (
      <Animated.FlatList
        ref={listRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.imageCard}>
              <Image source={{ uri: item }} style={styles.image} resizeMethod="resize" resizeMode="stretch" />
            </View>
          );
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handlerScroll}
        bounces={false}
        bouncesZoom={false}
        centerContent
        contentOffset={{ x: 0, y: 0 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    );
  }
}
