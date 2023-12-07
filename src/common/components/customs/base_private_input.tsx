import { FONT_MANAGER } from "@/assets";
import { Colors, Input, InputProps, Theme, makeStyles, normalize, useThemeMode } from "@rneui/themed";
import React, { useCallback, useState } from "react";

interface BasePrivateInputProps extends InputProps {
  callBack(value: string): void;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function BasePrivateInput(props: BasePrivateInputProps) {
  const { callBack, autoFocus, placeholder } = props;

  const styles = useStyles();
  const { mode } = useThemeMode();

  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  const onTextChange = useCallback(
    (value: string) => {
      setText(value);
      callBack(value);
    },
    [text],
  );

  const onTextSubmit = useCallback(() => {
    callBack(text);
  }, [text]);

  const onFocusBorderTrue = useCallback(() => {
    setIsFocus(true);
  }, []);

  const onFocusBorderFalse = useCallback(() => {
    setIsFocus(false);
  }, []);

  const onRightIconPress = useCallback(() => {
    setIsSecureTextEntry(!isSecureTextEntry);
  }, [isSecureTextEntry]);

  return (
    <Input
      value={text}
      onChangeText={onTextChange}
      keyboardType="default"
      keyboardAppearance={mode}
      enterKeyHint="enter"
      autoComplete="password"
      autoCorrect={false}
      autoFocus={autoFocus && autoFocus}
      autoCapitalize="none"
      showSoftInputOnFocus={true}
      secureTextEntry={isSecureTextEntry}
      inputMode="text"
      maxLength={50}
      multiline={false}
      onSubmitEditing={onTextSubmit}
      inputStyle={styles.inputContainer}
      containerStyle={[styles.container, isFocus && styles.focusedContainer]}
      underlineColorAndroid={"transparent"}
      inputContainerStyle={styles.inputContainerStyle}
      placeholder={placeholder}
      onFocus={onFocusBorderTrue}
      onBlur={onFocusBorderFalse}
      leftIcon={{
        name: "lock",
        type: "material-community",
        size: 20,
        activeOpacity: 0.5,
        underlayColor: "transparent",
        pressRetentionOffset: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        color: styles.icon.color,
        style: {
          padding: 5,
        },
        containerStyle: {
          borderRadius: 99,
          backgroundColor: "transparent",
        },
      }}
      rightIcon={{
        name: isSecureTextEntry ? "eye" : "eye-off",
        type: "ionicon",
        size: 20,
        activeOpacity: 0.5,
        color: styles.icon.color,
        underlayColor: "transparent",
        onPress: onRightIconPress,
        pressRetentionOffset: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        style: {
          padding: 5,
        },
        containerStyle: {
          borderRadius: 99,
          backgroundColor: "transparent",
        },
      }}
    />
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    backgroundColor: theme.colors.grey5,
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    height: normalize(56),
  },
  focusedContainer: {
    borderColor: theme.colors.secondary,
  },
  icon: {
    color: theme.colors.grey0,
  },
  inputContainer: {
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: normalize(15),
    color: theme.colors.grey0,
    textAlign: "left",
    textAlignVertical: "center",
    paddingVertical: normalize(0),
    borderWidth: 0,
    height: normalize(56),
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    borderRadius: normalize(16),
    borderWidth: 0,
    height: normalize(56),
  },
}));
