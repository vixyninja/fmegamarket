import { systemConstant } from "@constants/system.constant";
import { Button, Image, Text } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React, { useEffect } from "react";
import { FlatList, StatusBar, View } from "react-native";
import useStyles from "./styles";

export default function IntroductionScreen() {
  const styles = useStyles();
  const listRef = React.useRef<FlatList>(null);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < systemConstant.ON_BOARDING_IMAGE.length - 2) {
        listRef.current?.scrollToIndex({ index: index + 1, animated: true });
        setIndex(index + 1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  function onClickNext() {
    if (index < systemConstant.ON_BOARDING_IMAGE.length - 2) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    }
  }

  return (
    <BaseRootView>
      <StatusBar
        backgroundColor={"transparent"}
        barStyle={index === 0 || index === 1 ? "dark-content" : "light-content"}
        translucent
      />
      <View style={styles.containerList}>
        <FlatList
          data={systemConstant.ON_BOARDING_IMAGE.slice(1)}
          renderItem={({ item }) => {
            return <Image source={{ uri: item }} style={styles.image} />;
          }}
          ref={listRef}
          snapToAlignment="center"
          decelerationRate="fast"
          centerContent
          bounces={false}
          bouncesZoom={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
          horizontal
        />
      </View>

      {index === 0 && (
        <Text>We provide high quality products just for you</Text>
      )}
      {index === 1 && (
        <Text>Our products are made from natural ingredients</Text>
      )}
      {index === 2 && (
        <Text>Our products are made from natural ingredients</Text>
      )}
      <Button title={"Next"} onPress={onClickNext} />
    </BaseRootView>
  );
}
