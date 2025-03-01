import { Text, TouchableOpacity, View } from "react-native";

import { IconArrayUpCornerWithShadow } from "@/icons/icons";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import React from "react";
import { SvgXml } from "react-native-svg";

interface IVehiclesCardProps {
  item: {
    id: number;
    title: string;
    code: string;
    image: number;
    book: boolean;
    booked: string[];
  };
}

const VehicleCard = ({ item }: IVehiclesCardProps) => {
  return (
    <TouchableOpacity
      style={tw`bg-white relative border-t-4 border-[${
        item?.book ? "#FF0000" : "#00A405"
      }] rounded-lg py-2 px-4 flex-row justify-between`}
    >
      <View style={tw`py-2 px-3`}>
        <Text style={tw`text-black text-base font-PoppinsRegular`}>
          {item?.title}
        </Text>
        <Text style={tw`text-lg text-black font-PoppinsSemiBold`}>
          {item?.code}
        </Text>
      </View>
      <View style={tw`gap-3`}>
        <TButton
          title="Available"
          containerStyle={tw`bg-[${
            item?.book ? "#FF0000" : "#00A405"
          }] h-8 px-3`}
          titleStyle={tw`font-PoppinsRegular`}
        />

        <SvgXml style={tw`self-end`} xml={IconArrayUpCornerWithShadow} />
      </View>
    </TouchableOpacity>
  );
};

export default VehicleCard;
