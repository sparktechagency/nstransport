import { FlatList, TextInput, View } from "react-native";
import React, { useState } from "react";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { IconSearchGray } from "@/icons/icons";
import { SvgXml } from "react-native-svg";
import VehicleCard from "@/components/common/VehicleCard";
import availblevehicle from "@/assets/database/avablievehicle.json";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const transporter = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`Car Transporters  - ${
          availblevehicle?.filter((s) => {
            return s.book === false;
          }).length
        }`}
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
            style={tw`text-black flex-1`}
          />
          <SvgXml xml={IconSearchGray} />
        </View>
      </View>
      {/* all Available vehicles */}
      <FlatList
        contentContainerStyle={tw`pt-4 pb-8 gap-3 px-4`}
        data={availblevehicle
          ?.filter((s) => {
            return s.title.includes(search);
          })
          .filter((s) => {
            return s.book === false;
          })}
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

export default transporter;
