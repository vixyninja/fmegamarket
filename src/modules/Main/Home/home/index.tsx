import { BaseRootView } from "@/common";
import { AppParamList, BottomParamList } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import React from "react";
import {
  BannerCarouselHomeComponent,
  CategoriesHorizontalHomeComponent,
  CategoriesSelectionHomeComponent,
  HeaderHomeComponent,
  MostPopularHomeComponent,
  SearchHomeComponent,
  SpecialOfferHomeComponent,
} from "./components";
import useStyles from "./styles";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "HOME">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function HomeScreen({}: Props) {
  const styles = useStyles();

  console.log("RE RENDER HOME SCREEN");

  return (
    <BaseRootView
      enableBackHandler={true}
      style={styles.root}
      touchWithoutFeedback
    >
      <HeaderHomeComponent />
      <SearchHomeComponent />
      <SpecialOfferHomeComponent />
      <BannerCarouselHomeComponent />
      <CategoriesSelectionHomeComponent />
      <MostPopularHomeComponent />
      <CategoriesHorizontalHomeComponent />
    </BaseRootView>
  );
}
