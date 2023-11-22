import { theme } from "@libs/rne";
import { ThemeProvider } from "@rneui/themed";
import React from "react";

export default function AppTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
