import React from "react";
import { View } from "react-native";
import { Colors, Theme, makeStyles } from "@rneui/themed";

export default function Dot() {
  const styles = useStyles();
  return <View style={{ flex: 1, backgroundColor: "red" }} />;
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  inActiveDot: {
    backgroundColor: theme.colors.greyOutline,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
}));
