import { systemConstant } from "@constants/system.constant";
import { NavigationServices } from "@navigation/services.navigation";
import { Button, Image, Text } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import { OnBoardingScreenKeys } from "../";
import useStyles from "./styles";
import { IMAGE_MANAGER } from "@assets/images";
import { useTranslation } from "react-i18next";

export default function IntroductionScreen() {
  const styles = useStyles();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  function onClickNext() {
    if (index < systemConstant.ON_BOARDING_IMAGE.length - 2) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      NavigationServices.navigate(OnBoardingScreenKeys.Lobby);
    }
  }

  function onClickBack() {
    if (index > 0) {
      listRef.current?.scrollToIndex({ index: index - 1, animated: true });
      setIndex(index - 1);
    } else {
      NavigationServices.goBack();
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
            return (
              <Image
                source={{ uri: item }}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
                defaultSource={IMAGE_MANAGER.placeholder}
                transitionDuration={500}
                transition={true}
                fadeDuration={500}
              />
            );
          }}
          ref={listRef}
          bounces={false}
          bouncesZoom={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          horizontal
          scrollEnabled={false}
          scrollEventThrottle={16}
        />
      </View>

      <View style={styles.containerText}>
        {index === 0 && (
          <Text h3 h3Style={styles.text}>
            {t("introduction.text1")}
          </Text>
        )}
        {index === 1 && (
          <Text h3 h3Style={styles.text}>
            {t("introduction.text2")}
          </Text>
        )}
        {index === 2 && (
          <Text h3 h3Style={styles.text}>
            {t("introduction.text3")}
          </Text>
        )}
      </View>

      <View style={styles.containerDot}>
        {systemConstant.ON_BOARDING_IMAGE.slice(1).map((_, idx) => {
          if (idx === index) {
            return <View key={idx} style={styles.activeDot} />;
          }
          return <View key={idx} style={styles.dot} />;
        })}
      </View>

      <Button
        title={t("introduction.next")}
        onPress={onClickNext}
        containerStyle={styles.button}
      />

      <TouchableOpacity style={styles.backButton} onPress={onClickBack}>
        <Text
          style={[
            styles.backText,
            {
              color: index === 0 || index === 1 ? "black" : "white",
            },
          ]}
        >
          {t("introduction.back")}
        </Text>
      </TouchableOpacity>
    </BaseRootView>
  );
}
