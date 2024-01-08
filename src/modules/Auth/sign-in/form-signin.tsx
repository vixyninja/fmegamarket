import { BaseInput } from "@/common";
import { ISignInNormalCredential } from "@/core";
import { CheckBox, Icon } from "@rneui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useStyles from "./styles";

export function FormSignIn(props: {
  credential: ISignInNormalCredential;
  onChangeEmail: (email: string) => void;
  onChangePassword: (password: string) => void;
  disable: boolean;
  isRemember: boolean;
  onChangeRemember: () => void;
}) {
  const { credential, onChangeEmail, onChangePassword, disable, isRemember, onChangeRemember } = props;
  const styles = useStyles();
  const { t } = useTranslation();
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.buttonForm}>
      <BaseInput
        value={credential.email}
        onChangeText={onChangeEmail}
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

      <BaseInput
        value={credential.password}
        onChangeText={onChangePassword}
        autoFocus={false}
        placeholder={t("signIn.password")}
        disabled={disable}
        secureTextEntry={secure}
        leftIcon={{
          name: "lock",
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
        rightIcon={{
          name: "eye",
          type: "material-community",
          size: 20,
          activeOpacity: 0.5,
          underlayColor: "transparent",
          onPress: () => setSecure(!secure),
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

      <CheckBox
        center
        title={t("signIn.remember")}
        textStyle={styles.checkBoxText}
        containerStyle={styles.checkBoxContainer}
        wrapperStyle={styles.checkBoxWrapper}
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
      />
    </View>
  );
}
