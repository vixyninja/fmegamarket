import { FONT_MANAGER } from "@/assets";
import { ModalType } from "@/common/types";
import { Colors, Text, Theme, makeStyles, normalize } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import ReactNativeModal, { ModalProps } from "react-native-modal";

type Props = ModalProps & ModalType;

const BaseModal = (props: Partial<Props>) => {
  const styles = useStyles();

  const {
    title = "Title",
    content = "Content",
    leftButtonTitle = "Cancel",
    rightButtonTitle = "Try again",
    onLeftPress = () => {},
    onRightPress = () => {},
  } = props;

  return (
    <ReactNativeModal
      coverScreen={true}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      avoidKeyboard={true}
      backdropColor="transparent"
      backdropOpacity={0}
      animationInTiming={0}
      animationOutTiming={0}
      focusable={true}
      children={
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>

            <View style={styles.mainContainer}>
              <Text>{content}</Text>
            </View>
          </View>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={onLeftPress}
              style={styles.cancelButtonContainer}
              activeOpacity={0.9}
            >
              <Text style={styles.cancelText}>{leftButtonTitle}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onRightPress}
              activeOpacity={0.9}
              style={styles.doSomethingButtonContainer}
            >
              <Text style={styles.doSomethingText}>{rightButtonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      {...props}
    />
  );
};

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    borderRadius: normalize(20),
    marginHorizontal: normalize(20),
    elevation: 5,
  },
  contentContainer: {
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    borderTopEndRadius: normalize(20),
    borderTopStartRadius: normalize(20),
  },
  titleContainer: {
    height: normalize(40),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleText: {
    fontSize: normalize(16),
    fontFamily: FONT_MANAGER.poppins_semibold,
  },
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: normalize(56),
  },
  actionContainer: {
    height: normalize(50),
    backgroundColor: theme.colors.secondary,
    borderBottomEndRadius: normalize(20),
    borderBottomStartRadius: normalize(20),
    flexDirection: "row",
  },
  cancelButtonContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderBottomStartRadius: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderRightColor: theme.colors.divider,
    borderTopColor: theme.colors.divider,
  },
  cancelText: {
    color: theme.colors.error,
    fontFamily: FONT_MANAGER.poppins_semibold,
    fontSize: normalize(14),
  },
  doSomethingButtonContainer: {
    borderLeftWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftColor: theme.colors.divider,
    borderTopColor: theme.colors.divider,
    flex: 1,
    backgroundColor: theme.colors.background,
    borderBottomEndRadius: normalize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  doSomethingText: {
    color: theme.colors.tertiary,
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: normalize(14),
  },
}));

export default BaseModal;
