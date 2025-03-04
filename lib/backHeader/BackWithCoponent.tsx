import { Text, TouchableOpacity, View } from "react-native";

import { IconArrayRight } from "@/icons/icons";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
  ComponentBtn?: React.ReactNode;
  offBack?: boolean;
}

const BackWithComponent = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
}: BackButtonProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between gap-2 p-[4%] `,
        containerStyle,
      ]}
    >
      {!offBack ? (
        <TouchableOpacity
          onPress={onPress}
          style={tw`flex-row items-center gap-2 pr-4`}
        >
          <View
            style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
          >
            <SvgXml xml={IconArrayRight} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={tw`w-10 h-10`} />
      )}
      <Text
        numberOfLines={1}
        style={[tw`text-black font-PoppinsSemiBold text-base`, titleStyle]}
      >
        {title ? title : "Back"}
      </Text>

      {ComponentBtn ? ComponentBtn : <View style={tw`w-10 h-10`} />}
    </View>
  );
};

export default BackWithComponent;
