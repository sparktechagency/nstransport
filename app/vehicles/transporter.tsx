import { HIGHT, PrimaryColor } from "@/utils/utils";
import React, { useState } from "react";
import { FlatList, RefreshControl, TextInput, View } from "react-native";

import VehicleCard from "@/components/common/VehicleCard";
import { IconSearchGray } from "@/icons/icons";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import EmptyCard from "@/lib/Empty/EmptyCard";
import tw from "@/lib/tailwind";
import { useGetSearchVehicleQuery } from "@/redux/apiSlices/homeApiSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";

const transporter = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const {
    data: Transporter,
    isFetching: TransporterFetching,
    isLoading: TransporterLoading,
    refetch: TransporterRefetch,
  } = useGetSearchVehicleQuery({
    category: "Car Transporter",
    search: search,
  });

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`Car Transporters  - ${Transporter?.data?.length}`}
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
            placeholderTextColor={tw.color("gray-400")}
          />
          <SvgXml xml={IconSearchGray} />
        </View>
      </View>
      {/* all Available vehicles */}
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[PrimaryColor]}
            refreshing={TransporterLoading || TransporterFetching}
            onRefresh={() => {
              TransporterRefetch();
            }}
          />
        }
        contentContainerStyle={tw`pt-4 pb-8 gap-3 px-4`}
        ListEmptyComponent={
          <EmptyCard hight={HIGHT * 0.6} isLoading={TransporterFetching} />
        }
        data={Transporter?.data}
        renderItem={({ item, index }) => {
          return (
            <VehicleCard
              onPress={async () => {
                await AsyncStorage.setItem("vehicle", JSON.stringify(item));
                router?.push("/vehicles/booked_list");
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
