import { useBackHandler } from "@/common/hooks";
import { Colors, Theme, makeStyles } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler, Keyboard, TouchableWithoutFeedback, View, ViewProps } from "react-native";

interface BaseRootViewProps extends ViewProps {
  children: React.ReactNode;
  enableBackHandler?: boolean;
  touchWithoutFeedback?: boolean;
}

export default function BaseRootView(props: BaseRootViewProps) {
  const { children, enableBackHandler, touchWithoutFeedback } = props;
  const styles = useStyles();
  const { t } = useTranslation();
  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  useBackHandler(() => {
    if (!enableBackHandler) {
      return false;
    }
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
    <TouchableWithoutFeedback
      onPress={() => {
        touchWithoutFeedback && Keyboard.dismiss();
      }}
    >
      <View style={styles.root} {...props}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.background,
  },
}));
