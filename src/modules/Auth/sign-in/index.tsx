import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import {
  BackHeader,
  BaseInput,
  BasePrivateInput,
  BaseRootView,
  useAppDispatch,
  useLayoutAnimation,
} from "@/common";
import {
  CredentialSignIn,
  NavigationServices,
  useSignInNormalMutation,
} from "@/core";
import { CheckBox, Divider } from "@rneui/base";
import { Button, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthScreenKeys } from "../";
import useStyles from "./styles";

export default function SignInScreen() {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();

  const [signInNormal, { data }] = useSignInNormalMutation();

  const [credential, setCredential] = useState<CredentialSignIn>({
    email: "",
    password: "",
  });
  const [isRemember, setIsRemember] = useState(false);

  const onEmailChange = useCallback(
    (value: string) => {
      setCredential({
        ...credential,
        email: value,
      });
    },
    [credential.email],
  );

  const onPasswordChange = useCallback(
    (value: string) => {
      setCredential({
        ...credential,
        password: value,
      });
    },
    [credential.password],
  );

  const handleSignIn = () => {
    signInNormal({
      email: credential.email,
      password: credential.password,
      deviceToken: "test",
      deviceType: "android",
      rememberMe: isRemember,
    });
  };

  return (
    <BaseRootView touchWithoutFeedback>
      <ScrollView scrollEnabled={false}>
        <BackHeader onPress={() => NavigationServices.goBack()} />

        <Image
          source={IMAGE_MANAGER.signIn}
          style={styles.image}
          containerStyle={styles.imageContainer}
        />

        <Text h3 h3Style={styles.titleStyle}>
          {t("signIn.title")}
        </Text>

        <View style={styles.buttonForm}>
          <BaseInput
            callBack={onEmailChange}
            placeholder={t("signIn.email")}
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
            keyboardType="email-address"
          />

          <BasePrivateInput
            callBack={onPasswordChange}
            autoFocus={false}
            placeholder={t("signIn.password")}
          />
        </View>

        <CheckBox
          center
          title={t("signIn.remember")}
          textStyle={styles.checkBoxText}
          containerStyle={styles.checkBoxContainer}
          checkedIcon={
            <Icon
              name="checkmark-circle-outline"
              type="ionicon"
              color={styles.checkedCheckBox.color}
              size={25}
              iconStyle={{ marginRight: 5 }}
            />
          }
          uncheckedIcon={
            <Icon
              name="radio-button-off-outline"
              type="ionicon"
              color={styles.uncheckedCheckBox.color}
              size={25}
              iconStyle={{ marginRight: 5 }}
            />
          }
          checked={isRemember}
          onPress={() => setIsRemember(!isRemember)}
        />

        <Button
          raised
          title={t("signIn.button")}
          containerStyle={styles.signInButtonContainer}
          radius={99}
          onPress={() => handleSignIn()}
        />

        <TouchableOpacity onPress={() => {}} style={styles.forgotContainer}>
          <Text>{t("signIn.forgot")}</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>{t("signIn.or")}</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.selectionGroup}>
          <Button
            TouchableComponent={TouchableOpacity}
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
          <Text style={styles.footerText}>{t("signIn.dont")}</Text>
          <TouchableOpacity
            onPress={() => NavigationServices.navigate(AuthScreenKeys.SignUp)}
          >
            <Text h4Style={styles.footerTextClick} h4>
              {" "}
              {t("signIn.signup")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseRootView>
  );
}
