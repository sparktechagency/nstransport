import { Image, Text, TouchableOpacity, View } from "react-native";

import { IconArrayUpCornerWithShadow } from "@/icons/icons";
import React from "react";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";

interface IVehiclesCardProps {
  item: {
    id: number;
    title: string;
    code: string;
    image: number;
    book: boolean;
    booked: string[];
  };
  variant?: "showcase" | "mange";
  containerStyle?: any;
  onPress?: () => void;
}

const VehicleCard = ({
  onPress,
  item,
  variant,
  containerStyle,
}: IVehiclesCardProps) => {
  return (
    <TouchableOpacity
      disabled={item?.book}
      onPress={() => onPress && onPress()}
      style={[
        tw`bg-white relative border-t-4 border-[${
          item?.book ? "#FF0000" : "#00A405"
        }] rounded-lg py-2 px-4 flex-row justify-between`,
        containerStyle,
      ]}
    >
      <View style={tw`py-2 px-3`}>
        <Text style={tw`text-black text-base font-PoppinsRegular`}>
          {item?.title}
        </Text>
        <Text style={tw`text-lg text-black font-PoppinsSemiBold`}>
          {item?.code}
        </Text>
      </View>
      {variant == "mange" ? (
        <>
          {item?.image && (
            <Image
              style={tw`h-16 w-16`}
              source={
                item.image === 1
                  ? require("@/assets/images/sprinter.png")
                  : item.image === 2
                  ? require("@/assets/images/trailer.png")
                  : item.image === 3
                  ? require("@/assets/images/transporter.png")
                  : require("@/assets/images/empty.png")
              }
            />
          )}
        </>
      ) : (
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
      )}
    </TouchableOpacity>
  );
};

export default VehicleCard;
