import { Avatar, Colors, Text, Theme, makeStyles } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export type BaseHeaderProps = {
  size?: ("small" | "medium" | "large" | "xlarge") | number;
  source: any;
  onPress?: () => void;
};

export default function BaseHeader(props: BaseHeaderProps) {
  const { size = "medium", source, onPress } = props;
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <Avatar
        rounded
        size={size}
        source={source}
        onPress={onPress}
        containerStyle={styles.container}
        Component={TouchableOpacity}
      />
      <View style={styles.containerText}>
        <Text style={styles.title}>BaseHeader</Text>
        <Text style={styles.subTitle}>size: {size}</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  root: {
    flexDirection: "row",
  },
  container: {
    borderWidth: 1,
  },
  containerText: {
    justifyContent: "center",
    paddingStart: theme.spacing.sm,
  },
  title: {
    fontWeight: "bold",
  },
  subTitle: {},
}));
