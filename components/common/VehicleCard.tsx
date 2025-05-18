import { Image, Text, TouchableOpacity, View } from "react-native";

import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { IVehicle } from "@/redux/interface/interface";
import React from "react";

interface IVehiclesCardProps {
  item: IVehicle;
  variant?: "showcase" | "mange";
  containerStyle?: any;
  onPress?: () => void;
  disable?: boolean;
  offColor?: boolean;
}

const VehicleCard = ({
  onPress,
  item,
  variant,
  containerStyle,
  disable,
  offColor,
}: IVehiclesCardProps) => {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={() => onPress && onPress()}
      style={[
        tw`bg-white relative border-t-4 border-[${
          !offColor ? (item?.book ? "#FF0000" : "#00A405") : "gray"
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
          {item?.category && (
            <Image
              style={tw`h-16 w-16`}
              source={{
                uri: item?.category?.icon,
              }}
            />
          )}
        </>
      ) : (
        <View style={tw`gap-3`}>
          <TButton
            title={item?.book ? "Booked" : "Available"}
            containerStyle={tw`bg-[${
              item?.book ? "#FF0000" : "#00A405"
            }] h-8 px-3`}
            titleStyle={tw`font-PoppinsRegular`}
          />

          {/* <SvgXml style={tw`self-end`} xml={IconArrayUpCornerWithShadow} /> */}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VehicleCard;
