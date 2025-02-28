import { Text, TouchableOpacity } from "react-native";

import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface SimpleButtonProps {
  onPress?: () => void;
  svgIcon?: any;
  svgHeight?: number;
  svgWidth?: number;
  title?: string;
  titleStyle?: any;
  containerStyle?: any;
}

const SimpleButton = ({
  containerStyle,
  onPress,
  svgIcon,
  title,
  titleStyle,
  svgHeight = 16,
  svgWidth = 16,
}: SimpleButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        tw`border-2 border-[#E8E8EA] px-3 py-1 flex-row items-center rounded-full`,
        containerStyle,
      ]}
    >
      {title && (
        <Text style={[tw`text-primary font-RobotoBold text-xs`, titleStyle]}>
          {title}
        </Text>
      )}
      {svgIcon && <SvgXml height={svgHeight} width={svgWidth} xml={svgIcon} />}
    </TouchableOpacity>
  );
};

export default SimpleButton;
