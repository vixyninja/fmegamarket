import { IMAGE_MANAGER } from "@/assets";
import { dimens } from "@/configuration";
import { Image, makeStyles, normalize } from "@rneui/themed";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export const BannerCarouselHomeComponent = React.memo(() => {
  const styles = useStyles();
  const data = [IMAGE_MANAGER.i1, IMAGE_MANAGER.i2, IMAGE_MANAGER.i3];
  const listRef = useAnimatedRef<Animated.FlatList<string>>();
  const scrollX = useSharedValue(0);

  const handlerScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    Promise.all(data.map((item) => Image.prefetch(item)));
    Image.prefetch(IMAGE_MANAGER.iblur);
    return () => {};
  }, []);

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

  return (
    <View>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={styles.paddingRoot}>
              <Image source={{ uri: item }} style={styles.imageContainer} resizeMode="cover" />
            </View>
          );
        }}
        ref={listRef}
        horizontal
        bounces={false}
        bouncesZoom={false}
        centerContent
        contentOffset={{ x: 0, y: 0 }}
        onScroll={handlerScroll}
      />
      <IndicatorFlatList />
    </View>
  );
});

const useStyles = makeStyles((theme) => ({
  paddingRoot: {
    padding: normalize(8),
  },
  imageContainer: {
    width: dimens.width - normalize(16),
    height: normalize(200),
    borderRadius: normalize(8),
    overflow: "hidden",
    padding: normalize(20),
  },
  indicatorContainer: {
    position: "absolute",
    bottom: normalize(20),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  indicator: {
    marginHorizontal: normalize(12),
    backgroundColor: theme.colors.background,
    width: normalize(4),
    height: normalize(4),
    borderRadius: normalize(99),
  },
}));
