import { Image, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";

interface ICarStatusProps {
  item: {
    book: boolean;
    title: string;
    code: string;
    image: any;
  };
  onPress?: (item: any) => void;
}

const CarStatusCard = ({ item, onPress }: ICarStatusProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item)}
      style={tw`bg-[${
        item?.book ? "#FFE5E5" : "#E0FFE1"
      }] py-2 px-4 rounded-full flex-row items-center justify-between`}
    >
      <View style={tw`flex-row items-center gap-2`}>
        {item?.book ? (
          <View style={tw`bg-red-500 h-3 w-3 rounded-full`} />
        ) : (
          <View style={tw`bg-green-500 h-3 w-3 rounded-full`} />
        )}

        <Text style={tw`text-sm text-black font-PoppinsMedium`}>
          {item?.title}
        </Text>
      </View>
      <Text style={tw`text-sm text-black font-PoppinsBold`}>{item?.code}</Text>
      {item?.image && <Image style={tw`h-6 w-6`} source={item.image} />}
    </TouchableOpacity>
  );
};

export default CarStatusCard;
