import { bottomTabScreenStack } from "@features/Main";
import { useBackHandler } from "@hooks/useBackHandler";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Colors, Icon, Theme, makeStyles, useTheme } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function BottomTabNavigation() {
  const { theme } = useTheme();
  const styles = useStyles();
  const BottomTab = createBottomTabNavigator();

  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  useBackHandler(() => {
    if (backButtonEnabled) {
      return false;
    } else {
      return true;
    }
  });

  const bottomTabNavigationOptions: BottomTabNavigationOptions = {
    tabBarStyle: styles.tabBar,
    headerShown: false,
  };

  const startAnim = {
    0: { scale: 0.5, translateY: 10 },
    0.7: { translateY: -30 },
    1: { scale: 1.2, translateY: -20 },
  };
  const endAnim = {
    0: { scale: 1.2, translateY: -20 },
    1: { scale: 1, translateY: 10 },
  };

  const circleStart = {
    0: { scale: 0 },
    0.3: { scale: 0.3 },
    0.5: { scale: 0.5 },
    0.8: { scale: 0.8 },
    1: { scale: 1 },
  };
  const circleEnd = { 0: { scale: 1 }, 1: { scale: 0 } };

  const TabButton = (props: any) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef<any>(null);
    const circleRef = useRef<any>(null);
    const textRef = useRef<any>(null);

    useEffect(() => {
      if (focused) {
        viewRef.current.animate(startAnim);
        circleRef.current.animate(circleStart);
        textRef.current.transitionTo({ scale: 1 });
      } else {
        viewRef.current.animate(endAnim);
        circleRef.current.animate(circleEnd);
        textRef.current.transitionTo({ scale: 0 });
      }
    }, [focused]);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={styles.container}
      >
        <Animatable.View ref={viewRef} style={styles.container} useNativeDriver>
          <View style={styles.btn}>
            <Animatable.View
              ref={circleRef}
              style={styles.circle}
              useNativeDriver
            />
            <Icon
              type={item.type}
              name={item.icon}
              color={focused ? theme.colors.primary : theme.colors.secondary}
            />
          </View>
          <Animatable.Text ref={textRef} style={styles.text} useNativeDriver>
            {item.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    );
  };

  return (
    <BottomTab.Navigator
      screenOptions={bottomTabNavigationOptions}
      backBehavior="initialRoute"
      initialRouteName="Home"
    >
      {bottomTabScreenStack.map((_, index) => (
        <BottomTab.Screen
          key={index}
          name={bottomTabScreenStack[index].name}
          component={bottomTabScreenStack[index].component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <TabButton {...props} item={bottomTabScreenStack[index].option} />
            ),
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
}

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 56,
    position: "absolute",
    bottom: 10,
    right: 10,
    left: 10,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: theme.colors.secondary,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    borderRadius: 99,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: "bold",
  },
}));
