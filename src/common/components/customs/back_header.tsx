import { Colors, Icon, Theme, makeStyles, normalize } from "@rneui/themed";
import React from "react";
import { View, ViewProps } from "react-native";

export default function BackHeader(props: { onPress?: () => void; color?: string; style?: ViewProps["style"] }) {
  const styles = useStyles();
  const { onPress, color, style } = props;
  return (
    <View style={[styles.container, style]}>
      <Icon
        name="chevron-left"
        size={normalize(30)}
        color={color || styles.color.color}
        type="feather"
        onPress={onPress}
        containerStyle={styles.iconStyle}
        style={styles.iconContainer}
        onLongPress={onPress}
      />
    </View>
  );
}
const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    width: normalize(50),
    height: normalize(50),
  },
  iconContainer: {
    width: normalize(50),
    height: normalize(50),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  iconStyle: {
    borderRadius: normalize(99),
  },
  color: {
    color: theme.colors.secondary,
  },
}));
