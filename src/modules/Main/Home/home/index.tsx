import { ANIMS_MANAGER } from "@/assets";
import {
  BaseInput,
  BaseRootView,
  UserHeader,
  useAppDispatch,
  useAppSelector,
  useGoogleSignin,
  useLayoutAnimation,
} from "@/common";
import {
  AppParamList,
  AuthAction,
  BottomParamList,
  authSelector,
  userSelector,
} from "@/core";
import { UserAction } from "@/core/reduxs/reducers";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";
import { View } from "react-native";
import { Text } from "@rneui/themed";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "HOME">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function HomeScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutVerticalEaseInEase);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user } = useAppSelector(userSelector);
  const { signOut } = useGoogleSignin();
  const styles = useStyles();

  const [searchText, setSearchText] = useState("");

  return (
    <BaseRootView
      enableBackHandler={true}
      style={styles.root}
      touchWithoutFeedback
    >
      <View style={styles.paddingRoot}>
        <UserHeader
          userAvatar={user?.avatar}
          userName={user?.firstName}
          onPressHeart={() => {}}
          onPressNotification={() => {}}
        />
      </View>

      <View style={styles.paddingRoot}>
        <BaseInput
          value={searchText}
          placeholder={t("home.search")}
          callBack={setSearchText}
          leftIcon={{
            type: "feather",
            name: "search",
          }}
          rightIcon={{
            type: "feather",
            name: searchText ? "x" : "filter",
            onPress: () => {
              setSearchText("");
            },
          }}
        />
      </View>

      <View style={[styles.paddingRoot, styles.textIntroContainer]}>
        <Text style={styles.textIntro1}>Special Offers</Text>
        <Text style={styles.textIntro2}>See All</Text>
      </View>
    </BaseRootView>
  );
}
