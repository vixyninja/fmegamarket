import { useAppDispatch } from "@hooks/useRedux";
import { BaseRootView } from "@wrappers/hoc";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SignInScreen() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <BaseRootView>
      <></>
    </BaseRootView>
  );
}
