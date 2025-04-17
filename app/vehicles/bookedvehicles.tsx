import React, { useState } from "react";
import { FlatList, TextInput, View } from "react-native";

import VehicleCard from "@/components/common/VehicleCard";
import { IconSearchGray } from "@/icons/icons";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useGetSearchVehicleQuery } from "@/redux/apiSlices/homeApiSlices";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

const bookedvehicles = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const { data: allvehicles } = useGetSearchVehicleQuery({
    search: search,
    type: "booked",
  });

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`Booked vehicles - ${allvehicles?.data?.length}`}
      />

      {/* body section  */}

      <View style={tw`px-4 mt-2`}>
        {/* search Section  */}
        <View
          style={tw`h-12 px-3 flex-row  border border-gray-300 rounded-full items-center `}
        >
          <TextInput
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            placeholderTextColor={tw.color("gray-400")}
            style={tw`text-black flex-1`}
          />
          <SvgXml xml={IconSearchGray} />
        </View>
      </View>
      {/* all Available vehicles */}
      <FlatList
        contentContainerStyle={tw`pt-4 pb-8 gap-3 px-4`}
        data={allvehicles?.data}
        renderItem={({ item, index }) => {
          return (
            <VehicleCard
              onPress={() => {
                router.push({
                  pathname: "/vehicles/booking",
                  params: { id: item.id },
                });
              }}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

export default bookedvehicles;
