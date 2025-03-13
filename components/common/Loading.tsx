import { ActivityIndicator, View } from "react-native";

import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import React from "react";

const Loading = () => {
  return (
    <View
      style={tw`bg-gray-600 w-full bg-opacity-45 justify-center items-center h-full absolute z-50`}
    >
      <ActivityIndicator
        color={PrimaryColor}
        size="large"
        style={tw`text-3xl w-20 h-20`}
      />
    </View>
  );
};

export default Loading;
