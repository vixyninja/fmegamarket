import { ANIMS_MANAGER, IMAGE_MANAGER } from "@/assets";
import { BackHeader, BaseModal, BaseRootView, ModalType, useLayoutAnimation, validateSignInNormal } from "@/common";
import { AuthParamList } from "@/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider, Icon, Image, Text, useTheme } from "@rneui/themed";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FormSignIn } from "./form-signin";
import useStyles from "./styles";
import { useSignIn } from "./useSignIn";
type Props = NativeStackScreenProps<AuthParamList, "SIGN_IN_SCREEN">;

export default function SignInScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme } = useTheme();

  const [showModal, setShowModal] = useState<ModalType>({
    isShow: false,
    content: "Title",
    title: "Title",
    leftButtonTitle: "Cancel",
    onLeftPress: () => {},
    onRightPress: () => {},
    rightButtonTitle: "Done",
  });

  const { signInNormal, credential, isRemember, disable, onChangeEmail, onChangePassword, onChangeRemember } =
    useSignIn();

  const onClickBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, []);

  const onClickSignUp = useCallback(() => {
    navigation.navigate("SIGN_UP_SCREEN");
  }, []);

  const onClickOtherLogin = useCallback(() => {
    navigation.navigate("LOBBY_SCREEN");
  }, []);

  const onClickSignInNormal = async () => {
    try {
      if (validateSignInNormal(credential.email, credential.password)) {
        await signInNormal();
      }
    } catch (e: any) {
      console.log(e);
      setShowModal({
        ...showModal,
        isShow: true,
        title: "Error",
        content: e.message || "Something went wrong",
      });
    }
  };

  return (
    <BaseRootView touchWithoutFeedback>
      <ScrollView scrollEnabled={false}>
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

        <BackHeader onPress={onClickBack} />

        <Image source={{ uri: IMAGE_MANAGER.signIn }} style={styles.image} containerStyle={styles.imageContainer} />

        <Text h3 h3Style={styles.titleStyle}>
          {t("signIn.title")}
        </Text>

        <FormSignIn
          credential={credential}
          onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}
          disable={disable}
          isRemember={isRemember}
          onChangeRemember={onChangeRemember}
        />

        <Button
          raised
          title={t("signIn.button")}
          containerStyle={styles.signInButtonContainer}
          radius={99}
          onPress={onClickSignInNormal}
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
            onPress={onClickOtherLogin}
            disabled={disable}
            buttonStyle={styles.selectionButtonContainer}
            title={<Icon name="facebook" type="feather" size={20} color={theme.colors.facebook} />}
          />

          <Button
            onPress={onClickOtherLogin}
            disabled={disable}
            buttonStyle={styles.selectionButtonContainer}
            title={<Icon name="google" type="font-awesome" size={20} color={theme.colors.google} />}
          />

          <Button
            onPress={onClickOtherLogin}
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
