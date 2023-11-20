import { bottomTabScreenStack } from "@features/Main";
import { useBackHandler } from "@hooks/useBackHandler";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Icon, Text, normalize, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BottomTabNavigation() {
  const { theme } = useTheme();
  const BottomTab = createBottomTabNavigator();
  const { t } = useTranslation();

  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  const badge = [1, 2, 3, 4, 5];

  useBackHandler(() => {
    if (backButtonEnabled) {
      return false;
    } else {
      return true;
    }
  });

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
            tabBarLabel(props: {
              focused: boolean;
              color: string;
              position: LabelPosition;
              children: string;
            }) {
              return (
                <Text
                  style={{
                    color: props.focused
                      ? theme.colors.secondary
                      : theme.colors.grey4,
                    fontSize: normalize(11),
                  }}
                >
                  {t(bottomTabScreenStack[index].option.label)}
                </Text>
              );
            },
            tabBarIcon: (props: {
              focused: boolean;
              color: string;
              size: number;
            }) => (
              <Icon
                name={bottomTabScreenStack[index].option.icon}
                type={bottomTabScreenStack[index].option.type}
                size={24}
                color={
                  props.focused ? theme.colors.secondary : theme.colors.grey4
                }
              />
            ),
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}
