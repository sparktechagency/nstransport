import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";

const Data = [
  {
    id: 1,
    title: "Sprinters",
    amount: "8",
    color: "#FFF5E3",
    icon: require("@/assets/images/sprinter.png"),
    route: "/vehicles/sprinters",
  },
  {
    id: 2,
    title: "Car Transporter",
    amount: "8",
    color: "#FFE0E3",
    icon: require("@/assets/images/transporter.png"),
    route: "/vehicles/transporter",
  },
  {
    id: 3,
    title: "Trailers",
    amount: "8",
    color: "#DDEEFF",
    icon: require("@/assets/images/trailer.png"),
    route: "/vehicles/trailers",
  },
];

export default function availablevehicles() {
  const router = useRouter();
  return (
    <View style={tw`flex-1`}>
      <BackWithComponent title={"Available vehicles - 32"} />

      <ScrollView contentContainerStyle={tw`gap-2 mx-4 mt-3`}>
        {Data?.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(item.route as string);
              }}
              key={item.id}
              style={tw`bg-[${item.color}] w-full flex-row justify-between items-center p-5 rounded-lg`}
            >
              <View style={tw`mr-4 px-5`}>
                <Image style={tw`h-16 w-16`} source={item.icon} />
              </View>
              <View style={tw`justify-center items-center gap-1 flex-1 pl-10`}>
                <Text style={tw`text-sm text-black font-PoppinsRegular`}>
                  {item.title}
                </Text>
                <Text style={tw`text-2xl text-black font-PoppinsSemiBold`}>
                  {item.amount}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
