import { NativeModules } from "react-native";

const { ToastModule } = NativeModules;

type ToastDuration = "SHORT" | "LONG";

const showShort = (message: string) => {
  ToastModule.showShort(message);
};

const showLong = (message: string) => {
  ToastModule.showLong(message);
};

const show = (message: string, duration: ToastDuration) => {
  ToastModule.show(message, duration);
};

export const ToastUtil = { showShort, showLong, show };
