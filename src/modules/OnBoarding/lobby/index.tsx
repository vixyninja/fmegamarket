import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import { BaseRootView, BaseStatusBar, useLayoutAnimation } from "@/common";
import { AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useSignIn } from "./hook";
import useStyles from "./styles";

type Props = NativeStackScreenProps<AuthParamList, "LOBBY_SCREEN">;

export default function LobbyScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutVerticalEaseInEase);
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { disabled, onGoogleButtonPress } = useSignIn();

  const onClickSignInEmail = useCallback(() => {
    navigation.navigate("SIGN_IN_SCREEN");
  }, []);

  const onClickSignUpEmail = useCallback(() => {
    navigation.navigate("SIGN_UP_SCREEN");
  }, []);

  return (
    <BaseRootView>
      <BaseStatusBar />

      <Image
        source={IMAGE_MANAGER.appIcon}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
        defaultSource={IMAGE_MANAGER.placeholder}
        transitionDuration={500}
        transition={true}
        fadeDuration={500}
        containerStyle={styles.imageContainer}
      />

      <Text h1 style={styles.titleStyle}>
        {t("lobby.title")}
      </Text>

      <View style={styles.buttonForm}>
        <Button
          title={t("lobby.fb")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={
            <Icon
              name="facebook"
              type="feather"
              size={20}
              color={theme.colors.facebook}
            />
          }
          buttonStyle={styles.buttonContainer}
          disabled={disabled}
          onPress={() => {}}
        />

        <Button
          title={t("lobby.gg")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={
            <Icon
              name="google"
              type="font-awesome"
              size={20}
              color={theme.colors.google}
            />
          }
          buttonStyle={styles.buttonContainer}
          disabled={disabled}
          onPress={onGoogleButtonPress}
        />

        <Button
          title={t("lobby.tw")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={
            <Icon
              name="twitter"
              type="feather"
              size={20}
              color={theme.colors.twitter}
            />
          }
          buttonStyle={styles.buttonContainer}
          disabled={disabled}
        />
      </View>

      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.dividerText}>{t("lobby.or")}</Text>
        <Divider style={styles.divider} />
      </View>

      <Button
        raised
        title={t("lobby.email")}
        containerStyle={styles.signInButtonContainer}
        radius={99}
        disabled={disabled}
        onPress={onClickSignInEmail}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t("lobby.dont")}</Text>
        <TouchableOpacity onPress={onClickSignUpEmail}>
          <Text h4Style={styles.footerTextClick} h4>
            {" "}
            {t("lobby.signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </BaseRootView>
  );
}
