import { bottomTabScreenStack } from "@features/Main";
import { useBackHandler } from "@hooks/useBackHandler";
import { useAppDispatch } from "@hooks/useRedux";
import { AlertAction } from "@libs/app-redux";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Icon, Text, normalize, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BackHandler } from "react-native";

export default function BottomTabNavigation() {
  const BottomTab = createBottomTabNavigator();
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [backButtonEnabled, setBackButtonEnabled] = useState(false);
  const badge = [1, 2, 3, 4, 5];

  useBackHandler(() => {
    dispatch(
      AlertAction.setAlert({
        title: t("alert.exit_app.title"),
        message: t("alert.exit_app.message"),
        type: "warning",
        callback: () => {
          setBackButtonEnabled(true);
        },
        cancel() {
          setBackButtonEnabled(false);
        },
      }),
    );
    return false;
  });

  useEffect(() => {
    if (backButtonEnabled) {
      BackHandler.exitApp();
    }
  }, [backButtonEnabled]);

  const bottomTabNavigationOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.greyOutline,
      elevation: 2,
      paddingBottom: 4,
    },
    lazy: true,
  };

  const TextCustom = (props: {
    focused: boolean;
    color: string;
    position: LabelPosition;
    children: string;
    index: number;
  }) => {
    return (
      <Text
        style={{
          color: props.focused ? theme.colors.secondary : theme.colors.grey4,
          fontSize: normalize(11),
        }}
      >
        {t(
          `bottom_navigation.${bottomTabScreenStack[props.index].option.label}`,
        )}
      </Text>
    );
  };

  const IconCustom = (props: {
    focused: boolean;
    color: string;
    size: number;
    index: number;
  }) => {
    return (
      <Icon
        name={bottomTabScreenStack[props.index].option.icon}
        type={bottomTabScreenStack[props.index].option.iconType}
        size={props.size}
        color={props.color}
      />
    );
  };

  return (
    <BottomTab.Navigator
      screenOptions={bottomTabNavigationOptions}
      backBehavior="initialRoute"
      initialRouteName="Home"
      i18nIsDynamicList
    >
      {bottomTabScreenStack.map((_, index) => (
        <BottomTab.Screen
          key={index}
          name={bottomTabScreenStack[index].name}
          component={bottomTabScreenStack[index].component}
          options={{
            tabBarShowLabel: true,
            tabBarBadge: badge[index],
            tabBarLabel: (props) => <TextCustom {...props} index={index} />,
            tabBarIcon: (props) => <IconCustom {...props} index={index} />,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}
