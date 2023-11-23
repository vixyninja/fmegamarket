import { BackHeader } from "@components/customs";
import { BaseStatusBar } from "@components/shared";
import { BaseRootView } from "@wrappers/hoc";
import React from "react";
import useStyles from "./styles";
import { Button, Divider, Icon, Image, Text } from "@rneui/themed";
import { systemConstant } from "@constants/system.constant";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { IMAGE_MANAGER } from "@assets/images";
import { NavigationServices } from "@navigation/services.navigation";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";

export default function LobbyScreen() {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <BaseRootView>
      <BaseStatusBar />

      <BackHeader
        style={styles.backIcon}
        onPress={() => {
          NavigationServices.goBack();
        }}
      />

      <Image
        source={{ uri: systemConstant.LOBBY_IMAGE[0] }}
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
            <Icon name="facebook" type="feather" size={20} color="#3b5998" />
          }
          buttonStyle={styles.buttonContainer}
        />

        <Button
          title={t("lobby.gg")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={
            <Icon name="google" type="font-awesome" size={20} color="#db3236" />
          }
          buttonStyle={styles.buttonContainer}
        />

        <Button
          title={t("lobby.tw")}
          titleStyle={styles.buttonTitle}
          iconPosition="left"
          icon={
            <Icon name="twitter" type="feather" size={20} color="#00acee" />
          }
          buttonStyle={styles.buttonContainer}
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
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t("lobby.dont")}</Text>
        <TouchableOpacity
          onPress={() => {
            changeLanguage("en");
          }}
        >
          <Text h4Style={styles.footerTextClick} h4>
            {" "}
            {t("lobby.signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </BaseRootView>
  );
}
