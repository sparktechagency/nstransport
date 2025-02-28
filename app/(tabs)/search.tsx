import {
  IconArrayDown,
  IconCalendar,
  IconCloseBlack,
  IconSearchGray,
} from "@/icons/icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CarStatusCard from "@/components/common/CarStatusCard";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import DateModal from "@/lib/modals/DateModal";
import NormalModal from "@/lib/modals/NormalModal";
import tw from "@/lib/tailwind";
import { HIGHT } from "@/utils/utils";
import { SvgXml } from "react-native-svg";

const data = [
  {
    id: 1,
    title: "Express",
    code: "EX TR 7234",
    image: require("@/assets/images/sprinter.png"),
    book: true,
  },
  {
    id: 2,
    title: "Turbo",
    code: "TB FR 1923",
    image: require("@/assets/images/trailer.png"),
    book: false,
  },
  {
    id: 3,
    title: "Swift",
    code: "SW XP 4512",
    image: require("@/assets/images/transporter.png"),
    book: true,
  },
  {
    id: 4,
    title: "Pioneer",
    code: "PN QT 8796",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 5,
    title: "Voyager",
    code: "VG XR 5723",
    image: require("@/assets/images/trailer.png"),
    book: true,
  },
  {
    id: 6,
    title: "Rapid",
    code: "RP TY 2845",
    image: require("@/assets/images/trailer.png"),
    book: false,
  },
  {
    id: 7,
    title: "Velocity",
    code: "VL ZT 3967",
    image: require("@/assets/images/sprinter.png"),
    book: true,
  },
  {
    id: 8,
    title: "Momentum",
    code: "MM RX 8420",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 9,
    title: "Blaze",
    code: "BZ FR 6182",
    image: require("@/assets/images/sprinter.png"),
    book: true,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/trailer.png"),
    book: false,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
  {
    id: 10,
    title: "Thunder",
    code: "TH XP 4759",
    image: require("@/assets/images/sprinter.png"),
    book: false,
  },
];

export default function search() {
  const [selectVehicleModal, setSelectVehicleModal] = useState(false);
  const [startDateModal, setStartDateModal] = useState(false);
  const [endDateModal, setEndDateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStateDate] = useState("");
  const [endDate, setEndStart] = useState("");
  const [selectVehicle, setSelectVehicle] = useState(null);

  return (
    <View style={tw`flex-1 bg-base pt-12 px-4`}>
      <TouchableOpacity
        onPress={() => setSelectVehicleModal(!selectVehicleModal)}
        style={tw`flex-row justify-between border border-gray-400 px-5 h-12 rounded-full items-center`}
      >
        <Text style={tw`text-gray-600 font-PoppinsRegular text-xs`}>
          {selectVehicle?.title
            ? `${selectVehicle?.title} : `
            : "Select vehicle"}
          {selectVehicle?.title && (
            <Text style={tw`text-black text-sm font-PoppinsMedium `}>
              {selectVehicle?.code}
            </Text>
          )}
        </Text>
        <SvgXml xml={IconArrayDown} />
      </TouchableOpacity>

      <View style={tw`  mt-8 gap-3`}>
        <Text style={tw`text-black text-base font-PoppinsSemiBold`}>
          Booking Time:
        </Text>
        <View style={tw`bg-white rounded-xl px-4 py-10  gap-4`}>
          <IwtButton
            svg={IconCalendar}
            onPress={() => {
              setStartDateModal(!startDateModal);
            }}
            title="Start Date -"
            containerStyle={tw`flex-row-reverse justify-between px-4 rounded-full bg-transparent border border-gray-400`}
            titleStyle={tw`text-gray-500 text-sm font-PoppinsRegular`}
          />
          <IwtButton
            svg={IconCalendar}
            title="End Date -"
            containerStyle={tw`flex-row-reverse justify-between px-4 rounded-full bg-transparent border border-gray-400`}
            titleStyle={tw`text-gray-500 text-sm font-PoppinsRegular`}
          />
        </View>
      </View>

      <View style={tw`mt-8`}>
        <TButton title="Search" containerStyle={tw`rounded-full`} />
      </View>

      <DateModal
        visible={startDateModal}
        setVisible={setStartDateModal}
        selectedDate={(value) => {
          console.log(value);
        }}
      />

      <NormalModal
        setVisible={setSelectVehicleModal}
        visible={selectVehicleModal}
      >
        <View style={tw`bg-white rounded-md p-3 gap-5`}>
          {/* header parts  */}
          <View style={tw`flex-row justify-between items-center`}>
            <View />
            <Text style={tw`text-black font-PoppinsRegular text-base`}>
              Select vehicle
            </Text>
            <TouchableOpacity onPress={() => setSelectVehicleModal(false)}>
              <SvgXml xml={IconCloseBlack} />
            </TouchableOpacity>
          </View>
          <View style={tw`gap-4`}>
            {/* search  */}
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
            {/* Schedules  */}

            <View
              style={[
                tw`border border-gray-300 rounded-2xl p-3 `,
                { height: HIGHT * 0.5 },
              ]}
            >
              <ScrollView contentContainerStyle={tw`gap-3`}>
                {data
                  ?.filter((s) => s.title.includes(search))
                  .map((item, i) => {
                    return (
                      <CarStatusCard
                        onPress={(item) => {
                          setSelectVehicle(item);
                          setSelectVehicleModal(false);
                        }}
                        key={i}
                        item={item}
                      />
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        </View>
      </NormalModal>
    </View>
  );
}
