import React, { useState } from "react";
import { FlatList, TextInput, View } from "react-native";

import availblevehicle from "@/assets/database/avablievehicle.json";
import VehicleCard from "@/components/common/VehicleCard";
import { IconSearchGray } from "@/icons/icons";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

const sprinters = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  return (
    <View style={tw`flex-1`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`Sprinters - ${
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
          return <VehicleCard item={item} />;
        }}
      />
    </View>
  );
};

export default sprinters;
