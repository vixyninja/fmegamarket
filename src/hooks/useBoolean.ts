import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface IUseBoolean {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export function useBoolean(defaultValue?: boolean): IUseBoolean {
  const [value, setValue] = useState(!!defaultValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
}
