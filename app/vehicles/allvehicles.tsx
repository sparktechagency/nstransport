import { FlatList, TextInput, View } from "react-native";
import { IconSearchGray, IconThreeLine } from "@/icons/icons";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import EmptyCard from "@/lib/Empty/EmptyCard";
import { HIGHT } from "@/utils/utils";
import IwtButton from "@/lib/buttons/IwtButton";
import { RefreshControl } from "react-native";
import SideModal from "@/lib/modals/SideModal";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import VehicleCard from "@/components/common/VehicleCard";
import tw from "@/lib/tailwind";
import { useGetSearchVehicleQuery } from "@/redux/apiSlices/homeApiSlices";
import { useRouter } from "expo-router";

const allvehicles = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [filter, setFIlter] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: allvehicles,
    isFetching: allvehiclesFetching,
    isLoading: allvehiclesLoading,
    refetch: allvehiclesRefetch,
  } = useGetSearchVehicleQuery({
    search: search,
    filter: filter,
    type: "total",
  });
  // console.log(allvehicles);
  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`All vehicles - ${allvehicles?.data?.length}`}
        ComponentBtn={
          <View style={tw``}>
            <IwtButton
              onPress={() => {
                setShowModal(!showModal);
              }}
              title="All"
              svg={IconThreeLine}
              titleStyle={tw`text-black font-PoppinsRegular`}
              containerStyle={tw`bg-transparent border border-gray-500 h-9 px-3 `}
            />
          </View>
        }
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
        refreshControl={
          <RefreshControl
            refreshing={allvehiclesFetching}
            onRefresh={() => {
              allvehiclesRefetch();
            }}
          />
        }
        ListEmptyComponent={
          <EmptyCard
            hight={HIGHT * 0.6}
            isLoading={allvehiclesLoading || allvehiclesFetching}
          />
        }
        data={allvehicles?.data}
        renderItem={({ item, index }) => {
          return (
            <VehicleCard
              onPress={async () => {
                // if (item?.book) {
                //   AsyncStorage.setItem("booked", JSON.stringify(item));
                //   router.push("/vehicles/booked");
                // } else {
                //   AsyncStorage.setItem("vehicle", JSON.stringify(item));
                //   router.push("/vehicles/booking");
                // }
                await AsyncStorage.setItem("vehicle", JSON.stringify(item));
                router?.push("/vehicles/vehicle_details");
              }}
              item={item}
            />
          );
        }}
      />

      {/* show modal  */}

      <SideModal visible={showModal} setVisible={setShowModal}>
        <View style={tw`bg-white`}>
          <TButton
            title="All"
            onPress={() => {
              setFIlter("");
              setShowModal(false);
            }}
            containerStyle={tw`bg-transparent h-14`}
            titleStyle={tw`text-black font-PoppinsRegular`}
          />
          <TButton
            onPress={() => {
              setFIlter("available");
              setShowModal(false);
            }}
            title="Available"
            containerStyle={tw`bg-[#EFFFF0] h-14`}
            titleStyle={tw`text-green-500 font-PoppinsRegular`}
          />
          <TButton
            onPress={() => {
              setFIlter("booked");
              setShowModal(false);
            }}
            title="Booked"
            containerStyle={tw`bg-[#FFEDED] h-14`}
            titleStyle={tw`text-red-500 font-PoppinsRegular`}
          />
        </View>
      </SideModal>
    </View>
  );
};

export default allvehicles;
