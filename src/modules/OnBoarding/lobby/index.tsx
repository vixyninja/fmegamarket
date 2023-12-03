import { IMAGE_MANAGER } from "@/assets";
import {
  BaseRootView,
  BaseStatusBar,
  useAppDispatch,
  useGoogleSignin,
} from "@/common";
import { AlertAction, AuthAction, LoadingAction } from "@/core";
import { NavigationServices } from "@/core/navigation/services.navigation";
import { AuthScreenKeys } from "@/modules/Auth";
import auth from "@react-native-firebase/auth";
import { statusCodes } from "@react-native-google-signin/google-signin";
import { Button, Divider, Icon, Image, Text, useTheme } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import useStyles from "./styles";

export default function LobbyScreen() {
  const styles = useStyles();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { signIn, getTokens } = useGoogleSignin();
  const [disabled, setDisabled] = React.useState(false);
  const { theme } = useTheme();



  async function onGoogleButtonPress() {
    dispatch(LoadingAction.showLoadingWithTitle(t("loading.sign_in")));
    try {
      setDisabled(true);
      await signIn();
      const { idToken, accessToken } = await getTokens();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const credential = await auth().signInWithCredential(googleCredential);

      if (credential) {
        dispatch(
          AuthAction.setCredentials({
            provider: "google",
            idToken: idToken,
            isAuth: true,
            googleAccessToken: accessToken,
          }),
        );
      } else {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_cancelled.title"),
            message: t("alert.sign_in_cancelled.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.play_services_not_available.title"),
            message: t("alert.play_services_not_available.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      } else {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      }
    } finally {
      setDisabled(false);
      dispatch(LoadingAction.hideLoading());
    }
  }

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
          onPress={() => onGoogleButtonPress()}
        />

        <Button
          style={{
            borderWidth: 0,
          }}
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
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t("lobby.dont")}</Text>
        <TouchableOpacity>
          <Text h4Style={styles.footerTextClick} h4>
            {" "}
            {t("lobby.signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </BaseRootView>
  );
}
