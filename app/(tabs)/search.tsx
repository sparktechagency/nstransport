import { IconArrayDown, IconCloseBlack, IconSearchGray } from "@/icons/icons";
import { PrimaryColor, WIDTH } from "@/utils/utils";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import CarStatusCard from "@/components/common/CarStatusCard";
import NormalModal from "@/lib/modals/NormalModal";
import tw from "@/lib/tailwind";
import { useSearchVehicleQuery } from "@/redux/apiSlices/searchApiSlices";
import { IVehicle } from "@/redux/interface/interface";
import { CalendarList } from "react-native-calendars";
import { SvgXml } from "react-native-svg";

const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

export default function search() {
  const [search, setSearch] = useState("");
  const [selectVehicle, setSelectVehicle] = useState<IVehicle | null>(null);
  const {
    data: Search,
    isFetching,
    isLoading,
  } = useSearchVehicleQuery({
    search: search,
  });

  const [selectVehicleModal, setSelectVehicleModal] = useState(false);
  const [startDateModal, setStartDateModal] = useState(false);

  const marked = selectVehicle?.booked?.reduce((acc, date) => {
    acc[date] = {
      selected: true,
      disableTouchEvent: true,
      selectedColor: "#FF6060",
      selectedTextColor: "white",
    };
    return acc;
  }, {});

  // // Add unavailable dates
  // unavailableDates.forEach((date) => {
  //   marked[date] = {
  //     disabled: true, // Make it non-clickable
  //   };
  // });

  // console.log(marked);

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

      <View style={tw`  mt-4 gap-3 `}>
        <CalendarList
          current={today}
          markedDates={marked}
          calendarHeight={390}
          theme={theme}
          style={tw`rounded-md`}
          calendarWidth={WIDTH * 0.92}
          horizontal={false}
          staticHeader={true}
        />
      </View>

      <NormalModal
        setVisible={setSelectVehicleModal}
        visible={selectVehicleModal}
        scrollable
      >
        <View style={tw`bg-white rounded-md p-3 gap-5 `}>
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
                placeholderTextColor={tw.color("gray-400")}
              />
              <SvgXml xml={IconSearchGray} />
            </View>
            {/* Schedules  */}

            <View style={[tw`border border-gray-300 rounded-2xl p-3 `]}>
              <View style={tw`gap-3 min-h-96 `}>
                {isFetching || isLoading ? (
                  <View style={tw`flex-1 justify-center items-center `}>
                    <ActivityIndicator color={PrimaryColor} size={"large"} />
                  </View>
                ) : (
                  Search?.data?.map((item, i) => {
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
                  })
                )}
              </View>
            </View>
          </View>
        </View>
      </NormalModal>
    </View>
  );
}

const theme = {
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: "600",
          color: "#48BFE3",
        },
        monthText: {
          textAlign: "left", // Align the month name to start (left)
          fontWeight: "bold",
          fontSize: 18,
          marginLeft: 10, // Optional for spacing
        },
      },
    },
  },
  "stylesheet.day.basic": {
    today: tw`bg-primary rounded-full`,
    todayText: tw`text-white`,
  },
  // Custom styles for marked dates
  "stylesheet.day.single": {
    base: tw`border border-red-500`, // Add border to marked dates
    text: tw`text-red-500 font-bold`, // Make text red
  },
};
