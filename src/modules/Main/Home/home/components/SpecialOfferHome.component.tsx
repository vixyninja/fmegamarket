import { View } from "react-native";
import useStyles from "../styles";
import { Text } from "@rneui/themed";

export const SpecialOfferHomeComponent = () => {
  const styles = useStyles();
  return (
    <View style={[styles.paddingRoot, styles.textIntroContainer]}>
      <Text style={styles.textIntro1}>Special Offers</Text>
      <Text style={styles.textIntro2}>See All</Text>
    </View>
  );
};
