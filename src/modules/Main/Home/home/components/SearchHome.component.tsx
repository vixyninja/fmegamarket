import { View } from "react-native";
import useStyles from "../styles";
import { BaseInput } from "@/common";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SearchHomeComponent = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.paddingRoot}>
      <BaseInput
        value={searchText}
        placeholder={t("home.search")}
        onChangeText={setSearchText}
        leftIcon={{
          type: "feather",
          name: "search",
        }}
        rightIcon={{
          type: "feather",
          name: searchText ? "x" : "filter",
          onPress: () => {
            setSearchText("");
          },
        }}
      />
    </View>
  );
};
