import { FONT_MANAGER } from "@/assets";
import { Avatar, Icon, Text, makeStyles, normalize } from "@rneui/themed";
import { View } from "react-native";

type UserHeaderProps = {
  userAvatar: string;
  userName: string;
  onPressNotification?: () => void;
  onPressHeart?: () => void;
};

export default function UserHeader(props: Partial<UserHeaderProps>) {
  const { userAvatar, userName, onPressHeart, onPressNotification } = props;

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Avatar size={"large"} rounded source={{ uri: userAvatar }} />

      <View style={styles.contentContainer}>
        <Text style={styles.contentTop} numberOfLines={1}>
          Hello, welcome
        </Text>
        <Text style={styles.contentBottom} numberOfLines={1}>
          {userName}
        </Text>
      </View>

      <View style={styles.suffixContainer}>
        <Icon name="bell" size={normalize(24)} style={styles.suffixIcon} type="feather" onPress={onPressHeart} />
        <Icon
          name="heart"
          size={normalize(24)}
          style={styles.suffixIcon}
          type="feather"
          onPress={onPressNotification}
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flexDirection: "column",
    marginLeft: normalize(8),
    flexGrow: 1,
  },
  contentTop: {
    fontSize: normalize(16),
  },
  contentBottom: {
    fontSize: normalize(20),
    fontFamily: FONT_MANAGER.roboto_bold,
    color: theme.colors.secondary,
    overflow: "hidden",
  },
  suffixContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: normalize(8),
  },
  suffixIcon: {
    marginHorizontal: normalize(8),
    color: theme.colors.secondary,
  },
}));
