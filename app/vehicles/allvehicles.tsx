import { FlatList, TextInput, View } from "react-native";
import { IconSearchGray, IconThreeLine } from "@/icons/icons";
import React, { useState } from "react";

import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import IwtButton from "@/lib/buttons/IwtButton";
import SideModal from "@/lib/modals/SideModal";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import VehicleCard from "@/components/common/VehicleCard";
import availblevehicle from "@/assets/database/avablievehicle.json";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";

const allvehicles = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [filter, setFIlter] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={"All vehicles - 20"}
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
            return filter === "All"
              ? s
              : filter === "Available"
              ? s.book === false
              : s.book === true;
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

      {/* show modal  */}

      <SideModal visible={showModal} setVisible={setShowModal}>
        <View style={tw`bg-white`}>
          <TButton
            title="All"
            onPress={() => {
              setFIlter("All");
              setShowModal(false);
            }}
            containerStyle={tw`bg-transparent h-14`}
            titleStyle={tw`text-black font-PoppinsRegular`}
          />
          <TButton
            onPress={() => {
              setFIlter("Available");
              setShowModal(false);
            }}
            title="Available"
            containerStyle={tw`bg-[#EFFFF0] h-14`}
            titleStyle={tw`text-green-500 font-PoppinsRegular`}
          />
          <TButton
            onPress={() => {
              setFIlter("Booked");
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
