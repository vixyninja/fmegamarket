import { Icon, Text, makeStyles, normalize } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

const data = ["Sofa", "Chair", "Table", "Bed", "Cupboard", "Shelf", "Decor", "Other"];

export const CategoriesSelectionHomeComponent = () => {
  const styles = useStyles();
  const ItemCategory = ({ name }: { name: string }) => {
    return (
      <View style={styles.itemContainer}>
        <Icon
          name="home"
          size={normalize(24)}
          style={styles.itemWrapper}
          onPress={() => {}}
          containerStyle={{ borderRadius: styles.itemWrapper.borderRadius }}
        />
        <Text style={styles.itemText}>{name}</Text>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        {data.slice(0, 4).map((item, index) => (
          <ItemCategory key={index} name={item} />
        ))}
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        {data.slice(4).map((item, index) => (
          <ItemCategory key={index} name={item} />
        ))}
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  paddingRoot: {
    padding: normalize(8),
  },
  itemContainer: {
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: normalize(100),
  },
  itemWrapper: {
    borderRadius: normalize(99),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.grey5,
    padding: normalize(16),
  },
  itemText: {
    color: theme.colors.secondary,
    fontSize: normalize(12),
    fontWeight: "bold",
    marginTop: normalize(8),
  },
}));
