import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import {
  BackHeader,
  BaseInput,
  BasePrivateInput,
  BaseRootView,
  useAppDispatch,
  useLayoutAnimation,
} from "@/common";
import { Button, Divider, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthScreenKeys } from "../";
import useStyles from "./styles";
import { NavigationServices } from "@/core/navigation/services.navigation";

export default function SignUpScreen() {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();

  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");

  const onPasswordChange = useCallback(
    (value: string) => {
      setText2(value);
    },
    [text2],
  );

  const onEmailChange = useCallback(
    (value: string) => {
      setText(value);
    },
    [text],
  );

  return (
    <BaseRootView touchWithoutFeedback>
      <ScrollView scrollEnabled contentContainerStyle={styles.root}>
        <BackHeader onPress={() => NavigationServices.goBack()} />

        <Image
          source={IMAGE_MANAGER.signUp}
          style={styles.image}
          containerStyle={styles.imageContainer}
        />

        <Text h3 h3Style={styles.titleStyle}>
          {t("signUp.title")}
        </Text>

        <View style={styles.buttonForm}>
          <BaseInput
            callBack={onEmailChange}
            placeholder={t("signUp.email")}
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
            callBack={onPasswordChange}
            autoFocus={false}
            placeholder={t("signUp.password")}
          />
          <BasePrivateInput
            callBack={onPasswordChange}
            autoFocus={false}
            placeholder={t("signUp.confirm")}
          />
        </View>

        <Button
          raised
          title={t("signUp.button")}
          containerStyle={styles.signUpButtonContainer}
          radius={99}
          onPress={() => {}}
        />
        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>{t("signUp.or")}</Text>
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
          <Text style={styles.footerText}>{t("signUp.already")}</Text>
          <TouchableOpacity
            onPress={() => NavigationServices.navigate(AuthScreenKeys.SignIn)}
          >
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
