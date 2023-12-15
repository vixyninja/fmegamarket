import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import {
  BackHeader,
  BaseInput,
  BasePrivateInput,
  BaseRootView,
  useLayoutAnimation,
} from "@/common";
import { AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSignUp } from "./useSignUp";
import useStyles from "./styles";

type Props = NativeStackScreenProps<AuthParamList, "SIGN_UP_SCREEN">;

export default function SignUpScreen({ navigation, route }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);

  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();

  const {
    credential,
    disable,
    onChangeConfirmPassword,
    onChangeEmail,
    onChangePassword,
    signUpNormal,
  } = useSignUp();

  const onPressBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, []);

  const onClickOtherLogin = useCallback(() => {
    navigation.navigate("LOBBY_SCREEN");
  }, []);

  const onClickSignIn = useCallback(() => {
    navigation.navigate("SIGN_IN_SCREEN");
  }, []);

  return (
    <BaseRootView touchWithoutFeedback>
      <ScrollView scrollEnabled contentContainerStyle={styles.root}>
        <BackHeader onPress={onPressBack} />

        <Image
          source={{ uri: IMAGE_MANAGER.signUp }}
          style={styles.image}
          containerStyle={styles.imageContainer}
        />

        <Text h3 h3Style={styles.titleStyle}>
          {t("signUp.title")}
        </Text>

        <View style={styles.buttonForm}>
          <BaseInput
            callBack={onChangeEmail}
            placeholder={t("signUp.email")}
            value={credential.email}
            leftIcon={{
              name: "email",
              type: "material",
              size: 20,
              activeOpacity: 0.5,
              underlayColor: "transparent",
              pressRetentionOffset: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              },
              color: styles.icon.color,
              style: {
                padding: 5,
              },
              containerStyle: {
                borderRadius: 99,
                backgroundColor: "transparent",
              },
            }}
          />

          <BasePrivateInput
            callBack={onChangePassword}
            autoFocus={false}
            placeholder={t("signUp.password")}
            value={credential.password}
          />
          <BasePrivateInput
            callBack={onChangeConfirmPassword}
            autoFocus={false}
            placeholder={t("signUp.confirm")}
            value={credential.confirmPassword}
          />
        </View>

        <Button
          raised
          title={t("signUp.button")}
          containerStyle={styles.signUpButtonContainer}
          radius={99}
          onPress={signUpNormal}
        />
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>{t("signUp.or")}</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.selectionGroup}>
          <Button
            TouchableComponent={TouchableOpacity}
            onPress={onClickOtherLogin}
            buttonStyle={styles.selectionButtonContainer}
            title={
              <Icon
                name="facebook"
                type="feather"
                size={20}
                color={theme.colors.facebook}
              />
            }
          />

          <Button
            TouchableComponent={TouchableOpacity}
            onPress={onClickOtherLogin}
            buttonStyle={styles.selectionButtonContainer}
            title={
              <Icon
                name="google"
                type="font-awesome"
                size={20}
                color={theme.colors.google}
              />
            }
          />

          <Button
            TouchableComponent={TouchableOpacity}
            onPress={onClickOtherLogin}
            buttonStyle={styles.selectionButtonContainer}
            title={
              <Icon
                name="twitter"
                type="feather"
                size={20}
                color={theme.colors.twitter}
              />
            }
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t("signUp.already")}</Text>
          <TouchableOpacity onPress={onClickSignIn}>
            <Text h4Style={styles.footerTextClick} h4>
              {" "}
              {t("signUp.signin")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseRootView>
  );
}
