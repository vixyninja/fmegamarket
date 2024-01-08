import { CartScreen, ExploreScreen, HomeScreen, OrderScreen, ProfileScreen, bottomTabScreenStack } from "@/modules";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Icon, Text, normalize, useTheme } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

import { BottomParamList } from "./types.navigation";

export function BottomTabNavigation() {
  const BottomTab = createBottomTabNavigator<BottomParamList>();

  const { theme } = useTheme();
  const { t } = useTranslation();

  const badge = [1, 2, 3, 4, 5];

  const bottomTabNavigationOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.greyOutline,
      elevation: 2,
      paddingBottom: 4,
    },
    lazy: true,
    tabBarHideOnKeyboard: true,
    tabBarBadgeStyle: {
      backgroundColor: theme.colors.tertiary,
      color: theme.colors.background,
    },
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
        {t(`bottom_navigation.${bottomTabScreenStack[props.index].label}`)}
      </Text>
    );
  };

  const IconCustom = (props: { focused: boolean; color: string; size: number; index: number }) => {
    return (
      <Icon
        name={bottomTabScreenStack[props.index].icon}
        type={bottomTabScreenStack[props.index].type ?? "material-community"}
        size={props.size}
        color={props.color}
      />
    );
  };

  return (
    <BottomTab.Navigator screenOptions={bottomTabNavigationOptions} backBehavior="initialRoute" initialRouteName="HOME">
      <BottomTab.Screen
        key={"HOME"}
        name={"HOME"}
        component={HomeScreen}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[0],
          tabBarLabel: (props) => <TextCustom {...props} index={0} />,
          tabBarIcon: (props) => <IconCustom {...props} index={0} />,
        }}
      />
      <BottomTab.Screen
        key={"EXPLORE"}
        name={"EXPLORE"}
        component={ExploreScreen}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[1],
          tabBarLabel: (props) => <TextCustom {...props} index={1} />,
          tabBarIcon: (props) => <IconCustom {...props} index={1} />,
        }}
      />
      <BottomTab.Screen
        key={"CART"}
        name={"CART"}
        component={CartScreen}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[2],
          tabBarLabel: (props) => <TextCustom {...props} index={2} />,
          tabBarIcon: (props) => <IconCustom {...props} index={2} />,
        }}
      />
      <BottomTab.Screen
        key={"ORDER"}
        name={"ORDER"}
        component={OrderScreen}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[3],
          tabBarLabel: (props) => <TextCustom {...props} index={3} />,
          tabBarIcon: (props) => <IconCustom {...props} index={3} />,
        }}
      />
      <BottomTab.Screen
        key={"PROFILE"}
        name={"PROFILE"}
        component={ProfileScreen}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[4],
          tabBarLabel: (props) => <TextCustom {...props} index={4} />,
          tabBarIcon: (props) => <IconCustom {...props} index={4} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
