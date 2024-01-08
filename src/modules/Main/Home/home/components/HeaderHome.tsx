import { UserHeader, useAppSelector } from "@/common";
import { userSelector } from "@/core";
import { View } from "react-native";
import useStyles from "../styles";

const STATIC_USER = "https://i.pinimg.com/564x/4b/b5/d7/4bb5d7debd04235bc42579565642cc80.jpg";

export const HeaderHomeComponent = () => {
  const styles = useStyles();

  const { user } = useAppSelector(userSelector);
  return (
    <View style={styles.paddingRoot}>
      <UserHeader
        userAvatar={user?.avatar || STATIC_USER}
        userName={user?.firstName}
        onPressHeart={() => {}}
        onPressNotification={() => {}}
      />
    </View>
  );
};
