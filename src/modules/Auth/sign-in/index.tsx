import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import { BackHeader, BaseInput, BasePrivateInput, BaseRootView, useLayoutAnimation } from "@/common";
import { AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CheckBox, Divider } from "@rneui/base";
import { Button, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSignIn } from "./hook";
import useStyles from "./styles";

type Props = NativeStackScreenProps<AuthParamList, "SIGN_IN_SCREEN">;

export default function SignInScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);

  const { t } = useTranslation();

  const styles = useStyles();

  const { theme } = useTheme();

  const { credential, onChangeEmail, onChangePassword, signInNormal, onChangeRemember, isRemember, disable } =
    useSignIn();

  const onClickBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, []);

  const onClickSignUp = useCallback(() => {
    navigation.navigate("SIGN_UP_SCREEN");
  }, []);

  return (
    <BaseRootView touchWithoutFeedback>
      <ScrollView scrollEnabled={false}>
        <BackHeader onPress={onClickBack} />

        <Image source={IMAGE_MANAGER.signIn} style={styles.image} containerStyle={styles.imageContainer} />

        <Text h3 h3Style={styles.titleStyle}>
          {t("signIn.title")}
        </Text>

        <View style={styles.buttonForm}>
          <BaseInput
            value={credential.email}
            callBack={onChangeEmail}
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
            disabled={disable}
            autoFocus={false}
            keyboardType="email-address"
          />

          <BasePrivateInput
            value={credential.password}
            callBack={onChangePassword}
            autoFocus={false}
            placeholder={t("signIn.password")}
            disabled={disable}
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
              disabled={disable}
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
          onPress={onChangeRemember}
          disabled={disable}
        />

        <Button
          raised
          title={t("signIn.button")}
          containerStyle={styles.signInButtonContainer}
          radius={99}
          onPress={signInNormal}
          disabled={disable}
        />

        <TouchableOpacity onPress={() => {}} style={styles.forgotContainer} disabled={disable}>
          <Text>{t("signIn.forgot")}</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>{t("signIn.or")}</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.selectionGroup}>
          <Button
            onPress={onClickBack}
            disabled={disable}
            buttonStyle={styles.selectionButtonContainer}
            title={<Icon name="facebook" type="feather" size={20} color={theme.colors.facebook} />}
          />

          <Button
            onPress={onClickBack}
            disabled={disable}
            buttonStyle={styles.selectionButtonContainer}
            title={<Icon name="google" type="font-awesome" size={20} color={theme.colors.google} />}
          />

          <Button
            onPress={onClickBack}
            disabled={disable}
            buttonStyle={styles.selectionButtonContainer}
            title={<Icon name="twitter" type="feather" size={20} color={theme.colors.twitter} />}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t("signIn.dont")}</Text>
          <TouchableOpacity onPress={onClickSignUp}>
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
