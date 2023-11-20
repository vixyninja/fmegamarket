import { useBackHandler } from "@hooks/useBackHandler";
import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

export type BaseRootViewProps = {
  children: React.ReactNode;
  enableBackButton?: boolean;
  padding?: number | boolean;
};

export default function BaseRootView(props: BaseRootViewProps) {
  const { children, enableBackButton, padding } = props;
  const styles = useStyles();

  useBackHandler(() => {
    if (enableBackButton) {
      return false;
    } else {
      return true;
    }
  });

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
