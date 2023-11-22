import { useBackHandler } from "@hooks/useBackHandler";
import { useAppDispatch } from "@hooks/useRedux";
import { AlertAction } from "@libs/app_redux";
import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler, View } from "react-native";

export type BaseRootViewProps = {
  children: React.ReactNode;
  enableBackButton?: boolean;
  padding?: number | boolean;
};

export default function BaseRootView(props: BaseRootViewProps) {
  const { children, enableBackButton, padding } = props;
  const styles = useStyles();
  const { t } = useTranslation();
  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  useBackHandler(() => {
    if (enableBackButton) return false;
    Alert.alert(
      t("alert.exit_app.title"),
      t("alert.exit_app.message"),
      [
        {
          text: t("alert.exit_app.cancel"),
          onPress: () => {
            setBackButtonEnabled(false);
          },
          style: "cancel",
        },
        {
          text: t("alert.exit_app.ok"),
          onPress: () => {
            setBackButtonEnabled(true);
          },
        },
      ],
      { cancelable: false },
    );
    return true;
  });

  useEffect(() => {
    if (backButtonEnabled) {
      BackHandler.exitApp();
    }
  }, [backButtonEnabled]);

  return (
    <View
      style={[
        styles.root,
        {
          padding: padding ? normalize(16 || padding) : 0,
        },
      ]}
    >
      {children}
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
