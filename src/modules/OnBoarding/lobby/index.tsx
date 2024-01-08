import { IMAGE_MANAGER } from "@/assets";
import { BaseModal, BaseRootView, BaseStatusBar, ModalType, useSocialSignIn } from "@/common";
import { AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import useStyles from "./styles";
type Props = NativeStackScreenProps<AuthParamList, "LOBBY_SCREEN">;

export default function LobbyScreen({ navigation }: Props) {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { disabled, onGoogleButtonPress } = useSocialSignIn();

  const [showModal, setShowModal] = useState<ModalType>({
    isShow: false,
    content: "Title",
    title: "Title",
    leftButtonTitle: "Cancel",
    onLeftPress: () => {},
    onRightPress: () => {},
    rightButtonTitle: "Try again",
  });

  const onClickSignInEmail = useCallback(() => {
    navigation.navigate("SIGN_IN_SCREEN");
  }, []);

  const onClickSignUpEmail = useCallback(() => {
    navigation.navigate("SIGN_UP_SCREEN");
  }, []);

  const onClickSignInGoogle = useCallback(async () => {
    try {
      await onGoogleButtonPress();
    } catch (error: any) {
      setShowModal({
        ...showModal,
        isShow: true,
        title: "Error",
        content: error.message,
      });
    }
  }, []);

  return (
    <BaseRootView>
      <BaseStatusBar />

      <BaseModal
        isVisible={showModal.isShow}
        content={showModal.content}
        onBackdropPress={() => setShowModal({ ...showModal, isShow: false })}
        onBackButtonPress={() => setShowModal({ ...showModal, isShow: false })}
        onLeftPress={() => setShowModal({ ...showModal, isShow: false })}
        onRightPress={() => setShowModal({ ...showModal, isShow: false })}
        title={showModal.title}
        leftButtonTitle={showModal.leftButtonTitle}
        rightButtonTitle={showModal.rightButtonTitle}
      />

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
          icon={<Icon name="facebook" type="feather" size={20} color={theme.colors.facebook} />}
          buttonStyle={styles.buttonContainer}
          disabled={disabled}
          onPress={() => {}}
        />

        <Button
          title={t("lobby.gg")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={<Icon name="google" type="font-awesome" size={20} color={theme.colors.google} />}
          buttonStyle={styles.buttonContainer}
          disabled={disabled}
          onPress={onClickSignInGoogle}
        />

        <Button
          title={t("lobby.tw")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={<Icon name="twitter" type="feather" size={20} color={theme.colors.twitter} />}
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
