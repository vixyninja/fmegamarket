import { bottomTabScreenStack } from "@/modules";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { LabelPosition } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Icon, Text, normalize, useTheme } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BottomTabNavigation() {
  const BottomTab = createBottomTabNavigator();

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
    >
      <BottomTab.Screen
        key={bottomTabScreenStack[0].name}
        name={bottomTabScreenStack[0].name}
        component={bottomTabScreenStack[0].component}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[0],
          tabBarLabel: (props) => <TextCustom {...props} index={0} />,
          tabBarIcon: (props) => <IconCustom {...props} index={0} />,
        }}
      />
      <BottomTab.Screen
        key={bottomTabScreenStack[1].name}
        name={bottomTabScreenStack[1].name}
        component={bottomTabScreenStack[1].component}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[1],
          tabBarLabel: (props) => <TextCustom {...props} index={1} />,
          tabBarIcon: (props) => <IconCustom {...props} index={1} />,
        }}
      />
      <BottomTab.Screen
        key={bottomTabScreenStack[2].name}
        name={bottomTabScreenStack[2].name}
        component={bottomTabScreenStack[2].component}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[2],
          tabBarLabel: (props) => <TextCustom {...props} index={2} />,
          tabBarIcon: (props) => <IconCustom {...props} index={2} />,
        }}
      />
      <BottomTab.Screen
        key={bottomTabScreenStack[3].name}
        name={bottomTabScreenStack[3].name}
        component={bottomTabScreenStack[3].component}
        options={{
          tabBarShowLabel: true,
          tabBarBadge: badge[3],
          tabBarLabel: (props) => <TextCustom {...props} index={3} />,
          tabBarIcon: (props) => <IconCustom {...props} index={3} />,
        }}
      />
      <BottomTab.Screen
        key={bottomTabScreenStack[4].name}
        name={bottomTabScreenStack[4].name}
        component={bottomTabScreenStack[4].component}
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
