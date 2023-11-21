import { theme } from "@libs/rn-element";
import { ThemeProvider } from "@rneui/themed";
import React from "react";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
