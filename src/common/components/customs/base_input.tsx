import { FONT_MANAGER } from "@/assets";
import { Colors, Input, InputProps, Theme, makeStyles, normalize, useThemeMode } from "@rneui/themed";
import React, { useCallback, useState } from "react";

interface BaseInputProps extends InputProps {
  callBack(value: string): void;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function BaseInput(props: BaseInputProps) {
  const { callBack, autoFocus, placeholder } = props;

  const styles = useStyles();
  const { mode } = useThemeMode();

  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);

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

  return (
    <Input
      {...props}
      value={text}
      onChangeText={onTextChange}
      keyboardType="default"
      keyboardAppearance={mode}
      enterKeyHint="done"
      autoCorrect={false}
      autoFocus={autoFocus && autoFocus}
      autoCapitalize="none"
      showSoftInputOnFocus={true}
      secureTextEntry={false}
      inputMode="text"
      onSubmitEditing={onTextSubmit}
      inputStyle={styles.inputContainer}
      containerStyle={[styles.container, isFocus && styles.focusedContainer]}
      underlineColorAndroid={"transparent"}
      inputContainerStyle={styles.inputContainerStyle}
      placeholder={placeholder}
      onFocus={onFocusBorderTrue}
      onBlur={onFocusBorderFalse}
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
