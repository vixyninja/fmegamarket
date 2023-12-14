import { Colors, Icon, Theme, makeStyles, normalize } from "@rneui/themed";
import { StyleSheet, View, ViewStyle } from "react-native";
import ReactNativeModal from "react-native-modal";

export type BaseModalProps = {
  isVisible: boolean;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  onDismiss?: () => void;
  onSwipeComplete?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const BaseModal = (props: BaseModalProps) => {
  const styles = useStyles();

  const {
    isVisible,
    onBackButtonPress,
    onBackdropPress,
    onDismiss,
    onSwipeComplete,
    children,
    style,
  } = props;

  const CloseIcon = () => {
    return (
      <View style={styles.containerIcon}>
        <Icon
          name="close"
          size={normalize(24)}
          color={styles.iconColor.color}
          type="material"
          onPress={onBackButtonPress}
          containerStyle={{
            borderRadius: normalize(99),
            borderWidth: 1,
            backgroundColor: "transparent",
            borderColor: styles.iconColor.color,
          }}
          underlayColor="transparent"
        />
      </View>
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn={"bounceInLeft"}
      animationOut={"bounceOutRight"}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
      swipeDirection={["left", "right"]}
      onSwipeComplete={onSwipeComplete}
      backdropColor="rgba(0,0,0,0.9)"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationInTiming={500}
      animationOutTiming={500}
      avoidKeyboard={true}
      onDismiss={onDismiss}
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: 999,
        },
      ]}
      children={
        <View style={[styles.container, style]} pointerEvents="box-none">
          {children}
          <CloseIcon />
        </View>
      }
    />
  );
};

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    height: normalize(300),
    backgroundColor: theme.colors.white,
    borderRadius: normalize(12),
    elevation: 10,
    zIndex: 999,
  },
  containerIcon: {
    position: "absolute",
    top: normalize(10),
    right: normalize(10),
  },
  iconColor: {
    color: theme.colors.error,
  },
}));

export default BaseModal;
