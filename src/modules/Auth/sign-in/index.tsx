import { IMAGE_MANAGER } from "@assets/images";
import { BackHeader, BasePrivateInput } from "@components/customs";
import BaseInput from "@components/customs/base_input";
import { useAppDispatch } from "@hooks/useRedux";
import { NavigationServices } from "@navigation/services.navigation";
import { Button, CheckBox, Divider, Icon, Image, Text } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthScreenKeys } from "../";
import useStyles from "./styles";

export default function SignInScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const styles = useStyles();

  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [isRemember, setIsRemember] = useState(false);

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
      <ScrollView scrollEnabled={false}>
        <BackHeader onPress={() => NavigationServices.goBack()} />

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
          onPress={() => {}}
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
              <Icon name="facebook" type="feather" size={20} color="#3b5998" />
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
                color="#db3236"
              />
            }
          />

          <Button
            TouchableComponent={TouchableOpacity}
            buttonStyle={styles.selectionButtonContainer}
            title={
              <Icon name="twitter" type="feather" size={20} color="#00acee" />
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
