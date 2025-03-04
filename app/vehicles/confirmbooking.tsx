import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import BackWithComponent from "@/lib/backHeader/BackWithCoponent";
import { IconCalendar } from "@/icons/icons";
import { SvgXml } from "react-native-svg";
import availblevehicle from "@/assets/database/avablievehicle.json";
import tw from "@/lib/tailwind";

export default function bookingConfirm() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [selectVehicle, setSelectVehicle] = useState(null);
  const [booking, setBooking] = useState(null);

  // console.log(selectVehicle);

  useEffect(() => {
    if (id) {
      const item = availblevehicle.find((item) => item.id == (id as any));
      setSelectVehicle(item as any);
    }
  }, [id]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("booking");
      if (value !== null) {
        // value previously stored
      }
      setBooking(JSON.parse(value as any));
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={tw` flex-1 bg-base`}>
      {/* header part  */}
      <BackWithComponent
        onPress={() => {
          router.back();
        }}
        titleStyle={tw``}
        title={`${selectVehicle?.title} - ${selectVehicle?.code}`}
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`px-4 py-4 gap-5`}
      >
        {/* header parts  */}

        <View style={tw`gap-4 pb-5`}>
          <View style={tw`gap-1 `}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Renter Name
            </Text>
            <View
              style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                {booking?.renter_name}
              </Text>
            </View>
          </View>
          <View style={tw`gap-1 `}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Phone Number
            </Text>
            <View
              style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                {booking?.phone_number}
              </Text>
            </View>
          </View>
          <View style={tw`gap-1 `}>
            <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
              Booking Type
            </Text>
            <View
              style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
            >
              <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                {booking?.type}
              </Text>
            </View>
          </View>

          {booking?.type === "single" && (
            <>
              <View style={tw`gap-2`}>
                <Text
                  style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                >
                  Booking Date
                </Text>
                <View>
                  <View
                    style={tw`bg-white h-12 p-2 rounded-md flex-row items-center justify-between`}
                  >
                    <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                      {booking?.data?.map((date) => {
                        return (
                          <View key={date} style={tw`gap-3`}>
                            <Text style={tw`p-1 rounded-md`}>{date}</Text>
                          </View>
                        );
                      })}
                    </Text>
                    <SvgXml xml={IconCalendar} />
                  </View>
                </View>
              </View>
              <View style={tw`gap-2`}>
                <Text
                  style={tw`text-base text-black font-PoppinsSemiBold px-1`}
                >
                  Booking Time
                </Text>

                <View>
                  <View
                    style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                  >
                    <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                      {booking?.start_time}
                    </Text>
                    <SvgXml xml={IconCalendar} />
                  </View>
                </View>
                <View>
                  <View
                    style={tw`bg-white h-12 px-2 rounded-md flex-row items-center justify-between`}
                  >
                    <Text style={tw`text-sm text-gray-500 font-PoppinsRegular`}>
                      {booking?.end_time}
                    </Text>
                    <SvgXml xml={IconCalendar} />
                  </View>
                </View>
              </View>
            </>
          )}
          {booking?.type === "multiple" && (
            <View style={tw`gap-2`}>
              <Text style={tw`text-base text-black font-PoppinsSemiBold px-1`}>
                Booking Date
              </Text>
              <View>
                <View
                  style={tw`bg-white min-h-12 p-2 rounded-md flex-row ${
                    booking?.data?.length
                      ? "flex-wrap gap-2 "
                      : "justify-between"
                  } items-center `}
                >
                  {booking?.data?.map((date) => {
                    return (
                      <View key={date} style={tw`gap-3`}>
                        <Text style={tw`p-1 bg-base rounded-md`}>{date}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
