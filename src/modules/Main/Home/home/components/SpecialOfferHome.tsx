import { FONT_MANAGER } from "@/assets";
import { Text, makeStyles, normalize } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export const SpecialOfferHomeComponent = React.memo(() => {
  const styles = useStyles();
  console.log("RE RENDER SPECIAL OFFER HOME COMPONENT");
  return (
    <View style={[styles.paddingRoot, styles.textIntroContainer]}>
      <Text style={styles.textIntro1}>Special Offers</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={() => console.log("See All")}>
        <Text style={styles.textIntro2}>See All</Text>
      </TouchableOpacity>
    </View>
  );
});

const useStyles = makeStyles(() => ({
  paddingRoot: {
    padding: normalize(8),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: "bold",
    marginBottom: normalize(8),
  },
  textIntroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIntro1: {
    fontSize: normalize(18),
    fontFamily: FONT_MANAGER.poppins_semibold,
  },
  textIntro2: {
    fontSize: normalize(16),
    fontFamily: FONT_MANAGER.poppins_semibold,
  },
}));

export default useStyles;
